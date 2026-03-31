import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = import.meta.env.VITE_DASH_PIN;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      localStorage.setItem('isLoggedIn', 'true'); // Save session
      onLogin();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 text-center">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Private Access</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-8">Please enter your PIN to unlock the Command Center.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => {setPin(e.target.value); setError(false);}}
            placeholder="Enter PIN"
            className={`w-full p-4 text-center text-2xl tracking-[1em] rounded-xl border ${error ? 'border-red-500 bg-red-50 dark:bg-red-500/10' : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            maxLength={4}
          />
          {error && <p className="text-red-500 text-sm">Incorrect PIN. Try again.</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;