// import React, { useState } from 'react';
// import { useLocation, Navigate, useNavigate } from 'react-router-dom';

// const ExternalApp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   // Security Check: If someone goes directly to /app-viewer without clicking a card, send them back
//   if (!location.state || !location.state.url) {
//     return <Navigate to="/apps" replace />;
//   }

//   const { url, title } = location.state;

//   return (
//     <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
//       <div className="mb-4 flex items-center gap-4">
//         <button 
//           onClick={() => navigate('/apps')}
//           className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
//         >
//           ← Back
//         </button>
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           {title}
//         </h2>
//       </div>

//       <div className="relative flex-grow bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
//         {isLoading && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-800/80 z-10 backdrop-blur-sm">
//             <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mb-3"></div>
//             <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Booting Application...</p>
//           </div>
//         )}

//         <iframe
//           src={url}
//           className="w-full h-full border-none"
//           title={title}
//           onLoad={() => setIsLoading(false)}
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default ExternalApp;