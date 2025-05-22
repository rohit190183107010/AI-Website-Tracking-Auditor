
import React from 'react';

interface InputFormProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  targetUrl: string;
  setTargetUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ apiKey, setApiKey, targetUrl, setTargetUrl, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 mb-8 max-w-2xl mx-auto ring-1 ring-slate-700">
      <div className="space-y-6">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-sky-300 mb-1">
            Gemini API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API Key"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none placeholder-slate-500 text-slate-100"
            required
            autoComplete="off"
          />
           <p className="mt-1 text-xs text-slate-500">
            Your API key is used client-side for this demo. For production, manage keys securely.
          </p>
        </div>
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-sky-300 mb-1">
            Website URL to Audit
          </label>
          <input
            type="url"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none placeholder-slate-500 text-slate-100"
            required
          />
        </div>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Auditing...
            </>
          ) : (
            'Start Audit ✨'
          )}
        </button>
      </div>
    </form>
  );
};
    