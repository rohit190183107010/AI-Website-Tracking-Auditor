
import React from 'react';
import { PiiHandlingData } from '../../types';
import { DashboardCard } from '../DashboardCard';
import { ExclamationTriangleIcon } from '../icons';

export const PiiOverviewSection: React.FC<{ piiData: PiiHandlingData }> = ({ piiData }) => {
  return (
    <DashboardCard title="PII & Data Safety Overview"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
      collapsible={true} defaultCollapsed={true}
    >
      {piiData.alerts.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold text-yellow-400 mb-2 flex items-center">
            <ExclamationTriangleIcon className="mr-2" /> Potential PII Alerts:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-300/90">
            {piiData.alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}
       {piiData.alerts.length === 0 && <p className="text-slate-400 mb-4">No immediate PII transmission alerts identified by the AI.</p>}

      {piiData.recommendations.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-sky-400 mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            {piiData.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </DashboardCard>
  );
};
    