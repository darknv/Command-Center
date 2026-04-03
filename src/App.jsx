// import { useState, useEffect, useCallback } from "react";
// import TrackerCard from "./components/TrackerCard";
// import Login from "./components/Login";
// import AdminPanel from "./components/AdminPanel";

// function App() {
//   const [registry, setRegistry] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState("dark");
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true",
//   );

//   // NEW: State to toggle between views
//   const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard' or 'admin'

//   const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
//   const secretKey = import.meta.env.VITE_SECRET_KEY;

//   useEffect(() => {
//     if (theme === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [theme]);

//   // Wrapped in useCallback so we can trigger it from the Admin Panel after adding/deleting
//   const fetchRegistry = useCallback(async () => {
//     setLoading(true);
//     try {
//       const url = `${scriptUrl}?action=getRegistry&key=${secretKey}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.error) throw new Error(data.error);
//       setRegistry(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [scriptUrl, secretKey]);

//   useEffect(() => {
//     if (isLoggedIn) fetchRegistry();
//   }, [isLoggedIn, fetchRegistry]);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     setIsLoggedIn(false);
//     setCurrentView("dashboard");
//   };

//   if (!isLoggedIn) {
//     return <Login onLogin={() => setIsLoggedIn(true)} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 md:p-12 transition-colors duration-300">
//       <header className="mb-12 border-b border-gray-200 dark:border-slate-800 pb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
//             Command <span className="text-blue-500">Center</span>
//           </h1>
//         </div>

//         <div className="flex gap-3">
//           {/* Navigation Toggle Button */}
//           <button
//             onClick={() =>
//               setCurrentView(
//                 currentView === "dashboard" ? "admin" : "dashboard",
//               )
//             }
//             className="px-4 py-2 rounded-full font-medium bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors"
//           >
//             {currentView === "dashboard" ? "⚙️ Admin" : "📊 Dashboard"}
//           </button>

//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-3 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center w-11 h-11"
//           >
//             {theme === "dark" ? "☀️" : "🌙"}
//           </button>

//           <button
//             onClick={handleLogout}
//             className="text-sm text-white bg-red-500 p-3 rounded-2xl font-bold hover:text-red-600 dark:hover:text-red-400 hover:underline"
//           >
//             Logout Session
//           </button>
//         </div>
//       </header>

//       {loading && (
//         <div className="flex gap-2 items-center text-blue-500 dark:text-blue-400 mb-8">
//           <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
//           <p>Syncing data...</p>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-4 rounded-xl text-red-600 dark:text-red-400 mb-8">
//           <p className="font-bold">Connection Error</p>
//           <p className="text-sm opacity-80">{error}</p>
//         </div>
//       )}

//       {/* View Switcher: Show either the Bento Grid OR the Admin Panel */}
//       {!loading && !error && currentView === "dashboard" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
//           {registry.map((tracker, index) => (
//             <TrackerCard key={index} tracker={tracker} />
//           ))}
//         </div>
//       )}

//       {!loading && !error && currentView === "admin" && (
//         <AdminPanel
//           registry={registry}
//           refreshData={fetchRegistry}
//           scriptUrl={scriptUrl}
//           secretKey={secretKey}
//         />
//       )}
//     </div>
//   );
// }

// export default App;










// import { useState, useEffect, useCallback } from 'react';
// import TrackerCard from './components/TrackerCard';
// import Login from './components/Login';
// import AdminPanel from './components/AdminPanel';
// import Home from './components/Home';

// function App() {
//   const [registry, setRegistry] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState('dark');
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
//   // Default to home page when logged in
//   const [currentView, setCurrentView] = useState('home'); 
//   const [activeFilter, setActiveFilter] = useState('All');

//   const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
//   const secretKey = import.meta.env.VITE_SECRET_KEY;

//   useEffect(() => {
//     if (theme === 'dark') document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [theme]);

//   const fetchRegistry = useCallback(async () => {
//     setLoading(true);
//     try {
//       const url = `${scriptUrl}?action=getRegistry&key=${secretKey}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.error) throw new Error(data.error);
//       setRegistry(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [scriptUrl, secretKey]);

//   useEffect(() => {
//     if (isLoggedIn) fetchRegistry();
//   }, [isLoggedIn, fetchRegistry]);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     setIsLoggedIn(false);
//     setCurrentView('home');
//   };

//   const handleTrackerOpen = (id) => {
//     const stats = JSON.parse(localStorage.getItem('trackerStats') || '{}');
//     stats[id] = {
//       count: (stats[id]?.count || 0) + 1,
//       lastAccessed: Date.now()
//     };
//     localStorage.setItem('trackerStats', JSON.stringify(stats));
//   };

//   if (!isLoggedIn) {
//     return <Login onLogin={() => setIsLoggedIn(true)} />;
//   }

//   // Dynamic categories based on what's actually in your Google Sheet
//   const categories = ['All', ...new Set(registry.map(t => t.Type || 'General'))];
  
//   const filteredRegistry = activeFilter === 'All' 
//     ? registry 
//     : registry.filter(t => (t.Type || 'General') === activeFilter);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      
//       <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
            
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
//               <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight hidden sm:block">
//                 Command <span className="text-blue-500">Center</span>
//               </h1>
//             </div>

//             <div className="flex gap-1 sm:gap-4">
//               <button onClick={() => setCurrentView('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
//                 🏠 Home
//               </button>
//               <button onClick={() => setCurrentView('dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
//                 📊 Trackers
//               </button>
//               <button onClick={() => setCurrentView('admin')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'admin' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
//                 ⚙️ Admin
//               </button>
//             </div>

//             <div className="flex items-center gap-4">
//               <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
//                 {theme === 'dark' ? '☀️' : '🌙'}
//               </button>
//               <button onClick={handleLogout} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline hidden sm:block">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//         {loading && (
//           <div className="flex gap-2 items-center justify-center text-blue-500 dark:text-blue-400 my-12">
//             <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
//             <p className="font-medium">Syncing data from Google...</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-4 rounded-xl text-red-600 dark:text-red-400 mb-8 max-w-2xl mx-auto">
//             <p className="font-bold">Connection Error</p>
//             <p className="text-sm opacity-80">{error}</p>
//           </div>
//         )}
        
//         {!loading && !error && (
//           <>
//             {currentView === 'home' && <Home registry={registry} onOpenTracker={handleTrackerOpen} />}

//             {currentView === 'dashboard' && (
//               <div className="animate-fade-in">
//                 {/* Filters are exactly where you wanted them - only on the dashboard view */}
//                 <div className="flex flex-wrap gap-2 mb-8">
//                   {categories.map(category => (
//                     <button
//                       key={category}
//                       onClick={() => setActiveFilter(category)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                         activeFilter === category 
//                           ? 'bg-blue-600 text-white shadow-md' 
//                           : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>

//                 {filteredRegistry.length === 0 ? (
//                   <div className="text-center py-12 text-gray-500 dark:text-slate-400">No trackers found for this category.</div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
//                     {filteredRegistry.map((tracker, index) => (
//                       <TrackerCard key={index} tracker={tracker} onOpen={handleTrackerOpen} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {currentView === 'admin' && (
//               <AdminPanel 
//                 registry={registry} 
//                 refreshData={fetchRegistry} 
//                 scriptUrl={scriptUrl} 
//                 secretKey={secretKey} 
//               />
//             )}
//           </>
//         )}
//       </main>

//     </div>
//   );
// }

// export default App;















import { useState, useEffect, useCallback } from 'react';
import TrackerCard from './components/TrackerCard';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
// 1. NEW: Import your new Activity Dashboard
import Dashboard from './components/Dashboard'; 

function App() {
  const [registry, setRegistry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
  const [currentView, setCurrentView] = useState('home'); 
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
    setCurrentView('home');
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

  const categories = ['All', ...new Set(registry.map(t => t.Type || 'General'))];
  
  const filteredRegistry = activeFilter === 'All' 
    ? registry 
    : registry.filter(t => (t.Type || 'General') === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight hidden sm:block">
                Command <span className="text-blue-500">Center</span>
              </h1>
            </div>

            <div className="flex gap-1 sm:gap-4 overflow-x-auto">
              <button onClick={() => setCurrentView('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${currentView === 'home' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                🏠 Home
              </button>
              <button onClick={() => setCurrentView('dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                📊 Trackers
              </button>
              
              {/* 2. NEW: The Navigation Button for the Activity Log */}
              <button onClick={() => setCurrentView('activity')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${currentView === 'activity' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                ⚡ Activity Log
              </button>

              <button onClick={() => setCurrentView('admin')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${currentView === 'admin' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                ⚙️ Admin
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button onClick={handleLogout} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline hidden sm:block">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading && currentView !== 'activity' && (
          <div className="flex gap-2 items-center justify-center text-blue-500 dark:text-blue-400 my-12">
            <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
            <p className="font-medium">Syncing data from Google...</p>
          </div>
        )}
        
        {error && currentView !== 'activity' && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-4 rounded-xl text-red-600 dark:text-red-400 mb-8 max-w-2xl mx-auto">
            <p className="font-bold">Connection Error</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            {currentView === 'home' && <Home registry={registry} onOpenTracker={handleTrackerOpen} />}

            {currentView === 'dashboard' && (
              <div className="animate-fade-in">
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeFilter === category 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {filteredRegistry.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-slate-400">No trackers found for this category.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {filteredRegistry.map((tracker, index) => (
                      <TrackerCard key={index} tracker={tracker} onOpen={handleTrackerOpen} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentView === 'admin' && (
              <AdminPanel 
                registry={registry} 
                refreshData={fetchRegistry} 
                scriptUrl={scriptUrl} 
                secretKey={secretKey} 
              />
            )}
          </>
        )}

        {/* 3. NEW: Render the Activity Dashboard when the view matches */}
        {currentView === 'activity' && (
          <div className="animate-fade-in">
             <Dashboard />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;