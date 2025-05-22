
import React from 'react';
import { ExecutiveSummaryData } from '../../types';
import { DashboardCard } from '../DashboardCard';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '../icons'; // Placeholder, replace with actual icons

const SummaryItem: React.FC<{ label: string; value: string | number; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-slate-700/50 p-4 rounded-lg shadow">
    <div className="flex items-center text-slate-400 text-sm mb-1">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </div>
    <div className="text-2xl font-bold text-slate-100">{value}</div>
  </div>
);

export const ExecutiveSummary: React.FC<{ summary: ExecutiveSummaryData }> = ({ summary }) => {
  return (
    <DashboardCard title="Executive Summary & Health Score" 
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068M15.75 21H9c-4.97 0-9-4.03-9-9s4.03-9 9-9h6.75a9 9 0 019 9c0 .931-.14 1.827-.4 2.658" /></svg>}
      collapsible={false}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <SummaryItem label="Overall Health" value={summary.healthScore} />
        <SummaryItem label="Total Pixels" value={summary.totalPixels} />
        <SummaryItem label="Total Tags" value={summary.totalTags} />
        <SummaryItem label="Total Marketing Cookies" value={summary.totalCookies} />
        <SummaryItem label="Critical Errors" value={summary.criticalErrors} icon={<XCircleIcon className="text-red-400" />} />
        <SummaryItem label="Warnings" value={summary.warnings} icon={<ExclamationTriangleIcon className="text-yellow-400" />} />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-sky-400 mb-2">Key Opportunities:</h4>
        {summary.keyOpportunities.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {summary.keyOpportunities.map((opp, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="text-green-400 mr-2 mt-1 shrink-0" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">No specific key opportunities identified by the AI at this moment.</p>
        )}
      </div>
       <p className="text-xs text-slate-500 mt-6 text-right">Last Scanned: {new Date(summary.lastScanned).toLocaleString()}</p>
    </DashboardCard>
  );
};
    