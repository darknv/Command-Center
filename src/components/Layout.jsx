import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = ({ theme, setTheme, onLogout }) => {
  // NavLink automatically knows if it is the "active" page and applies styling
  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      
      {/* Universal Navigation Bar */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight hidden sm:block">
                Command <span className="text-blue-500">Center</span>
              </h1>
            </div>

            {/* NavLinks replace standard buttons */}
            <div className="flex gap-1 sm:gap-4 overflow-x-auto">
              <NavLink to="/" className={navClass}>🏠 Home</NavLink>
              <NavLink to="/trackers" className={navClass}>📊 Trackers</NavLink>
              <NavLink to="/apps" className={navClass}>🧩 Web Apps</NavLink>
              <NavLink to="/activity" className={navClass}>⚡ Activity Log</NavLink>
              <NavLink to="/admin" className={navClass}>⚙️ Admin</NavLink>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button onClick={onLogout} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline hidden sm:block">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* The Outlet injects whichever Route is currently active */}
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;