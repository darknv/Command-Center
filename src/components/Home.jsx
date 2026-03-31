import React from 'react';
import TrackerCard from './TrackerCard';

const quotes = [
  "The best way to predict the future is to invent it.",
  "Small disciplines repeated with consistency every day lead to great achievements.",
  "First, solve the problem. Then, write the code.",
  "Automation is to your time what compound interest is to your money.",
  "Do not wait to strike till the iron is hot, but make it hot by striking."
];

const Home = ({ registry, onOpenTracker }) => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const quote = quotes[dayOfYear % quotes.length];

  const stats = JSON.parse(localStorage.getItem('trackerStats') || '{}');

  const recentIds = Object.keys(stats).sort((a, b) => stats[b].lastAccessed - stats[a].lastAccessed).slice(0, 3);
  const recentTrackers = recentIds.map(id => registry.find(t => t['Sheet ID'] === id)).filter(Boolean);

  const frequentIds = Object.keys(stats).sort((a, b) => stats[b].count - stats[a].count).slice(0, 3);
  const frequentTrackers = frequentIds
    .filter(id => !recentIds.includes(id)) 
    .map(id => registry.find(t => t['Sheet ID'] === id))
    .filter(Boolean);

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 shadow-xl text-white">
        <h2 className="text-3xl font-extrabold mb-2">Welcome Back, Commander 👋</h2>
        <p className="text-blue-100 text-lg italic opacity-90">"{quote}"</p>
      </div>

      {recentTrackers.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">⏱️ Recently Used</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {recentTrackers.map((tracker, index) => (
              <TrackerCard key={`recent-${index}`} tracker={tracker} onOpen={onOpenTracker} />
            ))}
          </div>
        </section>
      )}

      {frequentTrackers.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">🔥 Mostly Used</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {frequentTrackers.map((tracker, index) => (
              <TrackerCard key={`freq-${index}`} tracker={tracker} onOpen={onOpenTracker} />
            ))}
          </div>
        </section>
      )}

      {recentTrackers.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-600">
          <p className="text-gray-500 dark:text-slate-400">Open some trackers from the "All Trackers" tab to see your stats here!</p>
        </div>
      )}
    </div>
  );
};

export default Home;