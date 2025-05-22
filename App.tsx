
import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { geminiAuditService } from './services/geminiService';
import { AuditResults, LoadingState } from './types';
import { GEMINI_MODEL_NAME } from './constants'; // Ensure GEMINI_MODEL_NAME is imported

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleAuditRequest = useCallback(async () => {
    if (!apiKey || !targetUrl) {
      setError('API Key and Target URL are required.');
      setLoadingState(LoadingState.IDLE);
      return;
    }
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setAuditResults(null);

    try {
      const results = await geminiAuditService.fetchAuditData(targetUrl, apiKey);
      setAuditResults(results);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err: any) {
      console.error("Audit failed:", err);
      setError(err.message || 'Failed to fetch audit data. Check console for details.');
      setLoadingState(LoadingState.ERROR);
    }
  }, [apiKey, targetUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-4 md:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-2">
          AI Website Tracking Auditor
        </h1>
        <p className="text-slate-400 text-lg">
          Instant insights into any website's tracking & marketing readiness.
        </p>
      </header>

      <main>
        <InputForm
          apiKey={apiKey}
          setApiKey={setApiKey}
          targetUrl={targetUrl}
          setTargetUrl={setTargetUrl}
          onSubmit={handleAuditRequest}
          isLoading={loadingState === LoadingState.LOADING}
        />

        {loadingState === LoadingState.LOADING && <LoadingSpinner />}
        {loadingState === LoadingState.ERROR && error && <ErrorMessage message={error} />}
        
        {loadingState === LoadingState.SUCCESS && auditResults && (
          <div className="mt-8">
            <Dashboard results={auditResults} />
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Auditor Inc. For demonstration purposes only.</p>
        <p className="mt-1 text-xs text-slate-600">
          Disclaimer: API keys are handled client-side in this demo. In a production environment, API keys should be managed securely on a backend server.
        </p>
      </footer>
    </div>
  );
};

export default App;
    