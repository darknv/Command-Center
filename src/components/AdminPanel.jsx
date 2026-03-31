import { useState } from "react";

const AdminPanel = ({ registry, refreshData, scriptUrl, secretKey }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("General");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !id) return alert("Name and Sheet ID are required!");
    setIsSubmitting(true);

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          action: "addTracker",
          key: secretKey,
          name,
          id,
          type,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setName("");
        setId("");
        setType("General");
        refreshData(); // Refresh the dashboard data
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Failed to add tracker: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (deleteId) => {
    if (!window.confirm("Are you sure you want to remove this tracker?"))
      return;

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          action: "deleteTracker",
          key: secretKey,
          id: deleteId,
        }),
      });
      const result = await response.json();

      if (result.success) {
        refreshData(); // Refresh the dashboard data
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Failed to delete tracker: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Add New Tracker Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ➕ Add New Tracker
        </h2>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Tracker Name (e.g., CoC War Log)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="md:col-span-1 p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Google Sheet ID (from URL)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="md:col-span-2 p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="md:col-span-1 p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none"
          >
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="General">General</option>
            <option value="Payroll">Payroll</option>
          </select>
          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? "Adding Tracker..." : "Add to Dashboard"}
          </button>
        </form>
      </div>

      {/* Manage Existing Trackers */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ⚙️ Manage Trackers
        </h2>
        {registry.length === 0 ? (
          <p className="text-gray-500 dark:text-slate-400">
            No trackers found.
          </p>
        ) : (
          <div className="space-y-3">
            {registry.map((tracker, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-100 dark:border-slate-700"
              >
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {tracker["Tracker Name"]}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-mono mt-1">
                    ID: {tracker["Sheet ID"]}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(tracker["Sheet ID"])}
                  className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
