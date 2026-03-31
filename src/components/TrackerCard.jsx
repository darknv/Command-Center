// import { useState, useEffect } from 'react';

// const TrackerCard = ({ tracker }) => {
//   const { 'Tracker Name': name, 'Sheet ID': id, 'Type': type } = tracker;
  
//   const [sheetData, setSheetData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
//   const secretKey = import.meta.env.VITE_SECRET_KEY;

//   useEffect(() => {
//     const fetchCardData = async () => {
//       try {
//         const url = `${scriptUrl}?action=getData&id=${id}&key=${secretKey}`;
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.error) throw new Error(data.error);
        
//         setSheetData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchCardData();
//   }, [id, scriptUrl, secretKey]);

//   const getTypeColor = (type) => {
//     switch (type?.toLowerCase()) {
//       case 'finance': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
//       case 'gaming': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
//       case 'coding': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
//       default: return 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-600';
//     }
//   };

//   const headers = sheetData.length > 0 ? sheetData[0] : [];
//   const latestRow = sheetData.length > 1 ? sheetData[sheetData.length - 1] : null;

//   return (
//     <div className="flex flex-col justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 text-gray-800 dark:text-white">
      
//       {/* Card Header */}
//       <div className="flex justify-between items-start mb-4">
//         {/* Changed text-white to text-gray-900 dark:text-white */}
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide truncate pr-2">{name || 'Unnamed Tracker'}</h3>
//         <span className={`px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getTypeColor(type)}`}>
//           {type || 'General'}
//         </span>
//       </div>

//       {/* Dynamic Data Area */}
//       <div className="flex-grow flex flex-col justify-center py-4 border-y border-gray-100 dark:border-slate-700/50 my-4 min-h-[120px]">
        
//         {loading && (
//           <div className="flex flex-col items-center justify-center space-y-3">
//             {/* Updated spinner color */}
//             <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-slate-500 border-t-transparent animate-spin"></div>
//             <p className="text-xs text-gray-500 dark:text-slate-500">Fetching live data...</p>
//           </div>
//         )}

//         {error && (
//           <p className="text-xs text-red-500 dark:text-red-400 text-center bg-red-50 dark:bg-red-500/10 p-2 rounded">
//             Failed to load data.
//           </p>
//         )}

//         {/* Display the "Latest Entry" if data exists */}
//         {!loading && !error && latestRow && (
//           <div className="space-y-2 w-full">
//             <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-2">Latest Entry:</p>
//             {headers.slice(0, 3).map((header, index) => (
//               // Updated background for list items
//               <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 p-2 rounded-lg">
//                 <span className="text-gray-600 dark:text-slate-400 text-sm">{header}:</span>
//                 <span className="text-gray-900 dark:text-white text-sm font-medium truncate max-w-[120px]" title={String(latestRow[index])}>
//                   {latestRow[index] !== "" ? String(latestRow[index]) : "-"}
//                 </span>
//               </div>
//             ))}
//             {headers.length > 3 && (
//               <p className="text-xs text-gray-400 dark:text-slate-500 text-center mt-2 italic">+ {headers.length - 3} more columns</p>
//             )}
//           </div>
//         )}

//         {!loading && !error && !latestRow && (
//           <p className="text-sm text-gray-400 dark:text-slate-500 italic text-center">Sheet is empty.</p>
//         )}
//       </div>

//       {/* Footer / Quick Actions */}
//       <div className="flex justify-between items-center mt-2">
//         <span className="text-xs text-gray-500 dark:text-slate-500">
//           {sheetData.length > 1 ? `${sheetData.length - 1} Total Records` : 'No Records'}
//         </span>
//         <a 
//           href={`https://docs.google.com/spreadsheets/d/${id}`} 
//           target="_blank" 
//           rel="noreferrer"
//           className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center gap-1 transition-colors font-medium"
//         >
//           Open Sheet <span className="text-lg">↗</span>
//         </a>
//       </div>
      
//     </div>
//   );
// };

// export default TrackerCard;




import { useState, useEffect } from 'react';

const TrackerCard = ({ tracker, onOpen }) => {
  const { 'Tracker Name': name, 'Sheet ID': id, 'Type': type } = tracker;
  
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const url = `${scriptUrl}?action=getData&id=${id}&key=${secretKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setSheetData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCardData();
  }, [id, scriptUrl, secretKey]);

  // Updated to match your exact categories
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'admin': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'hr': return 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20';
      case 'finance': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'payroll': return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
      case 'coding': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'general': 
      default: return 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-600';
    }
  };

  const headers = sheetData.length > 0 ? sheetData[0] : [];
  const latestRow = sheetData.length > 1 ? sheetData[sheetData.length - 1] : null;

  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 text-gray-800 dark:text-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide truncate pr-2">{name || 'Unnamed Tracker'}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getTypeColor(type)}`}>
          {type || 'General'}
        </span>
      </div>

      <div className="flex-grow flex flex-col justify-center py-4 border-y border-gray-100 dark:border-slate-700/50 my-4 min-h-[120px]">
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-slate-500 border-t-transparent animate-spin"></div>
            <p className="text-xs text-gray-500 dark:text-slate-500">Fetching live data...</p>
          </div>
        )}
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400 text-center bg-red-50 dark:bg-red-500/10 p-2 rounded">Failed to load data.</p>
        )}
        {!loading && !error && latestRow && (
          <div className="space-y-2 w-full">
            <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-2">Latest Entry:</p>
            {headers.slice(0, 3).map((header, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 p-2 rounded-lg gap-2">
                <span className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm truncate">{header}:</span>
                <span className="text-gray-900 dark:text-white text-xs sm:text-sm font-medium truncate max-w-[120px]" title={String(latestRow[index])}>
                  {latestRow[index] !== "" ? String(latestRow[index]) : "-"}
                </span>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && !latestRow && (
          <p className="text-sm text-gray-400 dark:text-slate-500 italic text-center">Sheet is empty.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500 dark:text-slate-500">
          {sheetData.length > 1 ? `${sheetData.length - 1} Total Records` : 'No Records'}
        </span>
        <a 
          href={`https://docs.google.com/spreadsheets/d/${id}`} 
          target="_blank" 
          rel="noreferrer"
          onClick={() => onOpen(id)} 
          className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center gap-1 transition-colors font-medium"
        >
          Open Sheet <span className="text-lg">↗</span>
        </a>
      </div>
    </div>
  );
};

export default TrackerCard;