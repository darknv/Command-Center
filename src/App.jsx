import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import TrackersGrid from './components/TrackersGrid';
import Dashboard from './components/Dashboard'; 
import AdminPanel from './components/AdminPanel';
import AppsGrid from './components/AppsGrid';

function App() {
  const [registry, setRegistry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [activeFilter, setActiveFilter] = useState('All');

  const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const fetchRegistry = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${scriptUrl}?action=getRegistry&key=${secretKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setRegistry(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [scriptUrl, secretKey]);

  useEffect(() => {
    if (isLoggedIn) fetchRegistry();
  }, [isLoggedIn, fetchRegistry]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const handleTrackerOpen = (id) => {
    const stats = JSON.parse(localStorage.getItem('trackerStats') || '{}');
    stats[id] = {
      count: (stats[id]?.count || 0) + 1,
      lastAccessed: Date.now()
    };
    localStorage.setItem('trackerStats', JSON.stringify(stats));
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // <-- FIXED: Deleted the first 'const categories' so it doesn't crash

  // Separate Web Apps from standard Trackers
  const standardTrackers = registry.filter(t => t.Type !== 'Web App');
  const webAppsRegistry = registry.filter(t => t.Type === 'Web App');

  // Generate categories ONLY from standard trackers
  const categories = ['All', ...new Set(standardTrackers.map(t => t.Type || 'General'))];

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout component wraps every page inside it */}
        <Route path="/" element={<Layout theme={theme} setTheme={setTheme} onLogout={handleLogout} />}>
          
          {/* Index Route (Home Page at '/') */}
          <Route index element={
            loading ? <LoadingState error={error} /> : <Home registry={registry} onOpenTracker={handleTrackerOpen} />
          } />
          
          {/* Trackers Grid at '/trackers' */}
          <Route path="trackers" element={
            loading ? <LoadingState error={error} /> :
            <TrackersGrid 
              registry={standardTrackers} // <-- Pass the filtered list here
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
              categories={categories} 
              onOpenTracker={handleTrackerOpen} 
            />
          } />
          
          {/* Activity Log at '/activity' */}
          <Route path="activity" element={<Dashboard />} />
          
          {/* Admin Panel at '/admin' */}
          <Route path="admin" element={
            loading ? <LoadingState error={error} /> :
            <AdminPanel registry={registry} refreshData={fetchRegistry} scriptUrl={scriptUrl} secretKey={secretKey} />
          } />

          {/* New Grid Page */}
          <Route path="apps" element={<AppsGrid webApps={webAppsRegistry} />} />
          

          {/* Fallback Route: If user types a bad URL, redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Extracted Loading UI to keep the router clean
const LoadingState = ({ error }) => {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-4 rounded-xl text-red-600 dark:text-red-400 mb-8 max-w-2xl mx-auto">
        <p className="font-bold">Connection Error</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center justify-center text-blue-500 dark:text-blue-400 my-12">
      <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
      <p className="font-medium">Syncing data from Google...</p>
    </div>
  );
};

export default App;