import React from 'react';
import TrackerCard from './TrackerCard';

const TrackersGrid = ({ registry, activeFilter, setActiveFilter, categories, onOpenTracker }) => {
  const filteredRegistry = activeFilter === 'All'
    ? registry
    : registry.filter(t => (t.Type || 'General') === activeFilter);

  return (
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
            <TrackerCard key={index} tracker={tracker} onOpen={onOpenTracker} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackersGrid;