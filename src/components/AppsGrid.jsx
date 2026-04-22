import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppsGrid = ({ webApps }) => {
  const navigate = useNavigate();

  const handleLaunch = (app) => {
    // We pass the URL and Title through React Router's "state"
    navigate('/app-viewer', { 
      state: { 
        url: app["Sheet ID"], // Because we saved the URL in the ID column!
        title: app["Tracker Name"] 
      } 
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🧩 Installed Web Apps
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Select an application to launch it inside your Command Center.</p>
      </div>

      {webApps.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl">
          <p className="text-gray-500 dark:text-slate-400">No Web Apps installed yet. Add one from the Admin Panel!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {webApps.map((app, index) => (
            <div 
              key={index} 
              className="group flex flex-col justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-all cursor-pointer"
              onClick={() => handleLaunch(app)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl group-hover:scale-110 transition-transform">
                  🚀
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{app["Tracker Name"]}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">App Engine: Google Apps Script</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppsGrid;