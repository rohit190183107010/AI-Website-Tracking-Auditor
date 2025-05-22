
import React from 'react';
import { AiGeneratedInsightsData } from '../../types';
import { DashboardCard } from '../DashboardCard';

export const AiPoweredInsights: React.FC<{ insights: AiGeneratedInsightsData }> = ({ insights }) => {
  return (
    <DashboardCard title="AI-Powered Insights & Recommendations"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-7.5h12.75c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H8.25m.75 12V9.75m3.75 12V9.75m0 8.25H12m2.25-8.25H12M15 12H9.75m5.25 0H9.75m5.25 0H9.75M12 9.75V12m0 0V9.75m0 0V6.75m0 0V9.75M6 12h1.5m1.5 0H6m1.5 0H6" /></svg>}
      collapsible={false} // Usually the main summary, so not collapsible
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-sky-400 mb-2">Overall Summary:</h4>
          <p className="text-slate-300 whitespace-pre-line">{insights.overallSummary || "No summary provided by AI."}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-sky-400 mb-2">Actionable Recommendations:</h4>
          {insights.actionableRecommendations.length > 0 ? (
            <ul className="list-decimal list-inside space-y-2 text-slate-300">
              {insights.actionableRecommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No specific actionable recommendations provided by the AI at this time.</p>
          )}
        </div>

        {insights.complianceNotes && (
          <div>
            <h4 className="text-lg font-semibold text-sky-400 mb-2">Compliance Notes:</h4>
            <p className="text-sm text-slate-400 whitespace-pre-line">{insights.complianceNotes}</p>
          </div>
        )}
        {insights.rawAnalysis && (
           <details className="mt-4 text-xs text-slate-500">
            <summary className="cursor-pointer hover:text-slate-400">View Raw AI Analysis (Technical)</summary>
            <pre className="mt-2 p-2 bg-slate-900/50 rounded overflow-x-auto max-h-60">{insights.rawAnalysis}</pre>
           </details>
        )}

      </div>
    </DashboardCard>
  );
};
    