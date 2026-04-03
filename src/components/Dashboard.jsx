// import React, { useState, useEffect, useMemo } from 'react';

// const Dashboard = () => {
//   const [activityData, setActivityData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState('Never');
//   const [error, setError] = useState(null);
  
//   // Date States
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [viewMode, setViewMode] = useState('Live Feed');

//   // NEW: Dropdown Filter States
//   const [selectedClient, setSelectedClient] = useState('All');
//   const [selectedEmployee, setSelectedEmployee] = useState('All');

//   const API_URL = import.meta.env.VITE_ACTIVITY_SCRIPT_URL;

//   const fetchActivityLog = async (isArchiveSearch = false) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       let fetchUrl = API_URL;
//       if (isArchiveSearch && startDate && endDate) {
//         fetchUrl = `${API_URL}?start=${startDate}&end=${endDate}`;
//         setViewMode(`Archive: ${startDate} to ${endDate}`);
//       } else {
//         setViewMode('Live 24-Hour Feed');
//       }

//       const response = await fetch(fetchUrl);
//       if (!response.ok) throw new Error("Network response was not ok");
//       const result = await response.json();
      
//       if (result.status === "success") {
//         const sortedData = isArchiveSearch ? result.data : result.data.sort((a, b) => new Date(b.time) - new Date(a.time));
//         setActivityData(sortedData);
//         setLastUpdated(new Date().toLocaleTimeString());
        
//         // Reset dropdowns when new data is pulled
//         setSelectedClient('All');
//         setSelectedEmployee('All');
//       } else {
//         throw new Error("API error");
//       }
//     } catch (err) {
//       setError("Failed to pull data. Check your network or Apps Script URL.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- HELPER: The Smart Splitter ---
//   // We moved this into a standalone function so both the Filters and the Table can use it
//   const extractLocationData = (row) => {
//     let displayClient = row.client;
//     let displayLocation = row.parentFolder;

//     if (!displayClient && displayLocation) {
//       if (displayLocation.includes(" ➔ ")) {
//         const parts = displayLocation.split(" ➔ ");
//         displayClient = parts[0]; 
//         displayLocation = parts.slice(1).join(" ➔ "); 
//       } else {
//         displayClient = displayLocation;
//         displayLocation = "Root";
//       }
//     }
//     return {
//       clientName: displayClient || "Unknown",
//       pathName: displayLocation || "Root"
//     };
//   };

//   // --- NEW: Generate Dynamic Dropdown Lists ---
//   // useMemo ensures we only recalculate these lists when activityData changes
//   const uniqueClients = useMemo(() => {
//     const clients = activityData.map(row => extractLocationData(row).clientName);
//     return ['All', ...new Set(clients)].sort();
//   }, [activityData]);

//   const uniqueEmployees = useMemo(() => {
//     const employees = activityData.map(row => row.userName);
//     return ['All', ...new Set(employees)].sort();
//   }, [activityData]);

//   // --- NEW: Apply Filters to the Data ---
//   const filteredData = useMemo(() => {
//     return activityData.filter(row => {
//       const clientMatch = selectedClient === 'All' || extractLocationData(row).clientName === selectedClient;
//       const employeeMatch = selectedEmployee === 'All' || row.userName === selectedEmployee;
//       return clientMatch && employeeMatch;
//     });
//   }, [activityData, selectedClient, selectedEmployee]);

//   // UI Helpers
//   const formatFileType = (mimeType) => {
//     if (!mimeType) return { icon: "❓", label: "Unknown", color: "bg-gray-100 text-gray-700" };
//     if (mimeType.includes("image")) return { icon: "🖼️", label: "Image", color: "bg-purple-100 text-purple-700" };
//     if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType.includes("csv")) return { icon: "📊", label: "Sheet", color: "bg-green-100 text-green-700" };
//     if (mimeType.includes("document") || mimeType.includes("word") || mimeType.includes("text")) return { icon: "📄", label: "Doc", color: "bg-blue-100 text-blue-700" };
//     if (mimeType.includes("pdf")) return { icon: "📕", label: "PDF", color: "bg-red-100 text-red-700" };
//     if (mimeType.includes("folder")) return { icon: "📁", label: "Folder", color: "bg-yellow-100 text-yellow-700" };
//     return { icon: "📎", label: "File", color: "bg-gray-100 text-gray-700" };
//   };

//   const getActionBadge = (action) => {
//     switch (action) {
//       case 'create': return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-green-100 text-green-700">CREATED</span>;
//       case 'edit': return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-yellow-100 text-yellow-700">EDITED</span>;
//       case 'delete': return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-red-100 text-red-700">DELETED</span>;
//       default: return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-gray-100 text-gray-700">{action.toUpperCase()}</span>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-[95%] mx-auto">
        
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Command Center</h1>
//             <p className="text-sm font-medium text-blue-600 mt-1">Currently Viewing: {viewMode}</p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-gray-500">
//               Last Updated: <span className="font-semibold">{lastUpdated}</span>
//             </span>
//             <button 
//               onClick={() => fetchActivityLog(false)}
//               disabled={loading}
//               className={`px-6 py-2 rounded-lg font-medium text-white transition-all shadow-sm
//                 ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`}
//             >
//               {loading ? 'Scanning...' : 'Refresh Live Feed'}
//             </button>
//           </div>
//         </div>

//         {/* Master Control Panel */}
//         <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-end gap-8">
          
//           {/* Database Fetch Controls */}
//           <div className="flex items-end gap-4 border-r border-gray-200 pr-8">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">From Date</label>
//               <input 
//                 type="date" 
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">To Date</label>
//               <input 
//                 type="date" 
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               />
//             </div>
//             <button 
//               onClick={() => fetchActivityLog(true)}
//               disabled={!startDate || !endDate || loading}
//               className={`px-6 py-2.5 rounded-lg font-medium transition-all border
//                 ${(!startDate || !endDate || loading) ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm'}`}
//             >
//               Search Archive
//             </button>
//           </div>

//           {/* NEW: Instant Frontend Filters */}
//           <div className="flex items-end gap-4 flex-grow">
//             <div className="flex-1">
//               <label className="block text-xs font-bold text-indigo-500 uppercase tracking-wide mb-2">Filter by Client</label>
//               <select 
//                 value={selectedClient} 
//                 onChange={(e) => setSelectedClient(e.target.value)}
//                 className="w-full border border-indigo-200 bg-indigo-50/30 rounded-lg p-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               >
//                 {uniqueClients.map((client, idx) => (
//                   <option key={idx} value={client}>{client}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex-1">
//               <label className="block text-xs font-bold text-indigo-500 uppercase tracking-wide mb-2">Filter by Employee</label>
//               <select 
//                 value={selectedEmployee} 
//                 onChange={(e) => setSelectedEmployee(e.target.value)}
//                 className="w-full border border-indigo-200 bg-indigo-50/30 rounded-lg p-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               >
//                 {uniqueEmployees.map((emp, idx) => (
//                   <option key={idx} value={emp}>{emp}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//         </div>

//         {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">{error}</div>}

//         {/* Data Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          
//           {/* Active Filter Status Bar */}
//           {(selectedClient !== 'All' || selectedEmployee !== 'All') && (
//             <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex items-center justify-between">
//               <span className="text-sm text-indigo-800 font-medium">
//                 Showing results for: 
//                 {selectedClient !== 'All' && <span className="font-bold ml-1">Client: {selectedClient}</span>}
//                 {selectedClient !== 'All' && selectedEmployee !== 'All' && <span className="mx-2">|</span>}
//                 {selectedEmployee !== 'All' && <span className="font-bold">Employee: {selectedEmployee}</span>}
//               </span>
//               <button 
//                 onClick={() => { setSelectedClient('All'); setSelectedEmployee('All'); }}
//                 className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
//                   <th className="p-4 whitespace-nowrap">Date & Time</th>
//                   <th className="p-4">Employee</th>
//                   <th className="p-4">Client</th>
//                   <th className="p-4">Action</th>
//                   <th className="p-4">Type</th>
//                   <th className="p-4 min-w-[200px]">File Name</th>
//                   <th className="p-4 min-w-[150px]">Nested Path</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {loading && activityData.length === 0 ? (
//                   <tr><td colSpan="7" className="p-12 text-center text-gray-400 font-medium">Connecting to Google Servers...</td></tr>
//                 ) : filteredData.length === 0 ? (
//                   <tr><td colSpan="7" className="p-12 text-center text-gray-400 font-medium">No activity matches your current filters.</td></tr>
//                 ) : (
//                   // WE NOW MAP OVER filteredData INSTEAD OF activityData
//                   filteredData.map((row, index) => {
//                     const fileFormat = formatFileType(row.fileType);
//                     const locationData = extractLocationData(row);

//                     return (
//                       <tr key={index} className="hover:bg-blue-50/50 transition-colors">
//                         <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
//                           {new Date(row.time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
//                         </td>
                        
//                         <td className="p-4">
//                           <div className="flex flex-col">
//                             <span className="text-sm font-bold text-gray-800">{row.userName}</span>
//                             <span className="text-xs text-gray-500">{row.userEmail}</span>
//                           </div>
//                         </td>

//                         <td className="p-4">
//                           <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-sm">
//                             {locationData.clientName}
//                           </span>
//                         </td>

//                         <td className="p-4">
//                           {getActionBadge(row.action)}
//                         </td>
                        
//                         <td className="p-4">
//                           <span className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 w-max ${fileFormat.color}`}>
//                             {fileFormat.icon} {fileFormat.label}
//                           </span>
//                         </td>
                        
//                         <td className="p-4 text-sm font-medium">
//                           {row.fileUrl ? (
//                             <a href={row.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors">
//                               {row.file} <span className="text-[10px]">↗</span>
//                             </a>
//                           ) : (
//                             <span className="text-gray-400 line-through">{row.file}</span>
//                           )}
//                         </td>
                        
//                         <td className="p-4">
//                           <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
//                             {locationData.pathName}
//                           </span>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;



















import React, { useState, useMemo } from 'react';

const Dashboard = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Never');
  const [error, setError] = useState(null);
  
  // Date States
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [viewMode, setViewMode] = useState('Live Feed');

  // Dropdown Filter States
  const [selectedClient, setSelectedClient] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState('All');

  // Uses your new dedicated environment variable!
  const API_URL = import.meta.env.VITE_ACTIVITY_SCRIPT_URL;

  const fetchActivityLog = async (isArchiveSearch = false) => {
    setLoading(true);
    setError(null);
    
    try {
      let fetchUrl = API_URL;
      // Note: If this script also requires the secret key, you would append it here!
      if (isArchiveSearch && startDate && endDate) {
        fetchUrl = `${API_URL}?start=${startDate}&end=${endDate}`;
        setViewMode(`Archive: ${startDate} to ${endDate}`);
      } else {
        setViewMode('Live 24-Hour Feed');
      }

      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      
      if (result.status === "success") {
        const sortedData = isArchiveSearch ? result.data : result.data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setActivityData(sortedData);
        setLastUpdated(new Date().toLocaleTimeString());
        
        setSelectedClient('All');
        setSelectedEmployee('All');
      } else {
        throw new Error("API error");
      }
    } catch (err) {
      setError("Failed to pull data. Check your network or Apps Script URL.");
    } finally {
      setLoading(false);
    }
  };

  const extractLocationData = (row) => {
    let displayClient = row.client;
    let displayLocation = row.parentFolder;

    if (!displayClient && displayLocation) {
      if (displayLocation.includes(" ➔ ")) {
        const parts = displayLocation.split(" ➔ ");
        displayClient = parts[0]; 
        displayLocation = parts.slice(1).join(" ➔ "); 
      } else {
        displayClient = displayLocation;
        displayLocation = "Root";
      }
    }
    return {
      clientName: displayClient || "Unknown",
      pathName: displayLocation || "Root"
    };
  };

  const uniqueClients = useMemo(() => {
    const clients = activityData.map(row => extractLocationData(row).clientName);
    return ['All', ...new Set(clients)].sort();
  }, [activityData]);

  const uniqueEmployees = useMemo(() => {
    const employees = activityData.map(row => row.userName);
    return ['All', ...new Set(employees)].sort();
  }, [activityData]);

  const filteredData = useMemo(() => {
    return activityData.filter(row => {
      const clientMatch = selectedClient === 'All' || extractLocationData(row).clientName === selectedClient;
      const employeeMatch = selectedEmployee === 'All' || row.userName === selectedEmployee;
      return clientMatch && employeeMatch;
    });
  }, [activityData, selectedClient, selectedEmployee]);

  // Updated Colors for Dark Mode
  const formatFileType = (mimeType) => {
    if (!mimeType) return { icon: "❓", label: "Unknown", color: "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300" };
    if (mimeType.includes("image")) return { icon: "🖼️", label: "Image", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400" };
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType.includes("csv")) return { icon: "📊", label: "Sheet", color: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" };
    if (mimeType.includes("document") || mimeType.includes("word") || mimeType.includes("text")) return { icon: "📄", label: "Doc", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" };
    if (mimeType.includes("pdf")) return { icon: "📕", label: "PDF", color: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" };
    if (mimeType.includes("folder")) return { icon: "📁", label: "Folder", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400" };
    return { icon: "📎", label: "File", color: "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300" };
  };

  const getActionBadge = (action) => {
    switch (action) {
      case 'create': return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-transparent dark:border-green-500/20">CREATED</span>;
      case 'edit': return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border border-transparent dark:border-yellow-500/20">EDITED</span>;
      case 'delete': return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-transparent dark:border-red-500/20">DELETED</span>;
      default: return <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300">{action.toUpperCase()}</span>;
    }
  };

  return (
    <div className="bg-transparent">
      <div className="max-w-full mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Activity Log</h1>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">Currently Viewing: {viewMode}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-slate-400">
              Last Updated: <span className="font-semibold text-gray-700 dark:text-gray-200">{lastUpdated}</span>
            </span>
            <button 
              onClick={() => fetchActivityLog(false)}
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium text-white transition-all shadow-sm
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`}
            >
              {loading ? 'Scanning...' : 'Refresh Live Feed'}
            </button>
          </div>
        </div>

        {/* Master Control Panel */}
        <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap items-end gap-8 transition-colors">
          
          <div className="flex items-end gap-4 border-r border-gray-200 dark:border-slate-700 pr-8">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">From Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg p-2.5 text-sm text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all color-scheme-dark"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">To Date</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg p-2.5 text-sm text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all color-scheme-dark"
              />
            </div>
            <button 
              onClick={() => fetchActivityLog(true)}
              disabled={!startDate || !endDate || loading}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all border
                ${(!startDate || !endDate || loading) ? 'bg-gray-50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 border-gray-200 dark:border-slate-700 cursor-not-allowed' : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600 hover:shadow-sm'}`}
            >
              Search Archive
            </button>
          </div>

          <div className="flex items-end gap-4 flex-grow">
            <div className="flex-1">
              <label className="block text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mb-2">Filter by Client</label>
              <select 
                value={selectedClient} 
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-500/10 rounded-lg p-2.5 text-sm text-gray-700 dark:text-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                {uniqueClients.map((client, idx) => (
                  <option key={idx} value={client} className="dark:bg-slate-800">{client}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mb-2">Filter by Employee</label>
              <select 
                value={selectedEmployee} 
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-500/10 rounded-lg p-2.5 text-sm text-gray-700 dark:text-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                {uniqueEmployees.map((emp, idx) => (
                  <option key={idx} value={emp} className="dark:bg-slate-800">{emp}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {error && <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-500/30">{error}</div>}

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
          
          {(selectedClient !== 'All' || selectedEmployee !== 'All') && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 px-6 py-3 border-b border-indigo-100 dark:border-indigo-500/20 flex items-center justify-between">
              <span className="text-sm text-indigo-800 dark:text-indigo-300 font-medium">
                Showing results for: 
                {selectedClient !== 'All' && <span className="font-bold ml-1">Client: {selectedClient}</span>}
                {selectedClient !== 'All' && selectedEmployee !== 'All' && <span className="mx-2">|</span>}
                {selectedEmployee !== 'All' && <span className="font-bold">Employee: {selectedEmployee}</span>}
              </span>
              <button 
                onClick={() => { setSelectedClient('All'); setSelectedEmployee('All'); }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-700 text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="p-4 whitespace-nowrap">Date & Time</th>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 min-w-[200px]">File Name</th>
                  <th className="p-4 min-w-[150px]">Nested Path</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                {loading && activityData.length === 0 ? (
                  <tr><td colSpan="7" className="p-12 text-center text-gray-400 dark:text-slate-500 font-medium">Connecting to Google Servers...</td></tr>
                ) : filteredData.length === 0 ? (
                  <tr><td colSpan="7" className="p-12 text-center text-gray-400 dark:text-slate-500 font-medium">No activity matches your current filters.</td></tr>
                ) : (
                  filteredData.map((row, index) => {
                    const fileFormat = formatFileType(row.fileType);
                    const locationData = extractLocationData(row);

                    return (
                      <tr key={index} className="hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="p-4 text-sm text-gray-600 dark:text-slate-300 whitespace-nowrap">
                          {new Date(row.time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{row.userName}</span>
                            <span className="text-xs text-gray-500 dark:text-slate-400">{row.userEmail}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-sm">
                            {locationData.clientName}
                          </span>
                        </td>

                        <td className="p-4">
                          {getActionBadge(row.action)}
                        </td>
                        
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 w-max border border-transparent dark:border-current border-opacity-20 ${fileFormat.color}`}>
                            {fileFormat.icon} {fileFormat.label}
                          </span>
                        </td>
                        
                        <td className="p-4 text-sm font-medium">
                          {row.fileUrl ? (
                            <a href={row.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors">
                              {row.file} <span className="text-[10px]">↗</span>
                            </a>
                          ) : (
                            <span className="text-gray-400 dark:text-slate-500 line-through">{row.file}</span>
                          )}
                        </td>
                        
                        <td className="p-4">
                          <span className="text-xs font-mono text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-900 px-2 py-1 rounded border border-gray-100 dark:border-slate-700">
                            {locationData.pathName}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;