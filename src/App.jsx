
// import { useState, useEffect } from 'react';
// import TrackerCard from './components/TrackerCard';
// import Login from './components/Login';

// function App() {
//   const [registry, setRegistry] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState('dark');
  
//   // Login State - check localStorage so you don't have to login every refresh
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

//   const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
//   const secretKey = import.meta.env.VITE_SECRET_KEY;

//   useEffect(() => {
//     if (theme === 'dark') document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [theme]);

//   useEffect(() => {
//     // Only fetch data if logged in
//     if (!isLoggedIn) return;

//     const fetchRegistry = async () => {
//       try {
//         const url = `${scriptUrl}?action=getRegistry&key=${secretKey}`;
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data.error) throw new Error(data.error);
//         setRegistry(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRegistry();
//   }, [isLoggedIn, scriptUrl, secretKey]);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     setIsLoggedIn(false);
//   };

//   // If not logged in, show Login Screen
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
//         <div>
//         <button onClick={handleLogout} className="text-sm bg-red-500 text-white font-bold rounded m-5 p-3 hover:underline">Logout Session</button>
//         <button 
//           onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//           className="p-3 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors shadow-sm"
//         >
//           {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
//         </button>
//         </div>
        
//       </header>
      
//       {loading && (
//         <div className="flex gap-2 items-center text-blue-400">
//           <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"></div>
//           <p>Decrypting data...</p>
//         </div>
//       )}
      
//       {!loading && !error && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
//           {registry.map((tracker, index) => (
//             <TrackerCard key={index} tracker={tracker} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;







import { useState, useEffect, useCallback } from 'react';
import TrackerCard from './components/TrackerCard';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

function App() {
  const [registry, setRegistry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
  // NEW: State to toggle between views
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'admin'

  const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Wrapped in useCallback so we can trigger it from the Admin Panel after adding/deleting
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
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 md:p-12 transition-colors duration-300">
      <header className="mb-12 border-b border-gray-200 dark:border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Command <span className="text-blue-500">Center</span>
          </h1>
         
        </div>
        
        <div className="flex gap-3">
          {/* Navigation Toggle Button */}
          <button 
            onClick={() => setCurrentView(currentView === 'dashboard' ? 'admin' : 'dashboard')}
            className="px-4 py-2 rounded-full font-medium bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors"
          >
            {currentView === 'dashboard' ? '⚙️ Admin' : '📊 Dashboard'}
          </button>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center w-11 h-11"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

           <button onClick={handleLogout} className="text-sm text-white bg-red-500 p-3 rounded-2xl font-bold hover:text-red-600 dark:hover:text-red-400 hover:underline">Logout Session</button>


        </div>
      </header>
      
      {loading && (
        <div className="flex gap-2 items-center text-blue-500 dark:text-blue-400 mb-8">
          <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
          <p>Syncing data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-4 rounded-xl text-red-600 dark:text-red-400 mb-8">
          <p className="font-bold">Connection Error</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      )}
      
      {/* View Switcher: Show either the Bento Grid OR the Admin Panel */}
      {!loading && !error && currentView === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {registry.map((tracker, index) => (
            <TrackerCard key={index} tracker={tracker} />
          ))}
        </div>
      )}

      {!loading && !error && currentView === 'admin' && (
        <AdminPanel 
          registry={registry} 
          refreshData={fetchRegistry} 
          scriptUrl={scriptUrl} 
          secretKey={secretKey} 
        />
      )}

    </div>
  );
}

export default App;