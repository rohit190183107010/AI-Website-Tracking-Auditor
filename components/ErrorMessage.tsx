
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-md my-6 max-w-2xl mx-auto shadow-lg" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/></svg>
        </div>
        <div>
          <p className="font-bold text-red-200">Error</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
    