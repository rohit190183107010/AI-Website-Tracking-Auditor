
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12 p-8 bg-slate-800/50 rounded-lg shadow-xl max-w-md mx-auto">
      <svg className="animate-spin h-12 w-12 text-sky-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-xl font-semibold text-slate-300">Analyzing Website...</p>
      <p className="text-slate-400">Please wait while AI generates insights.</p>
    </div>
  );
};
    