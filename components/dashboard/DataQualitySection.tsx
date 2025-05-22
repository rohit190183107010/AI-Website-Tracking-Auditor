
import React from 'react';
import { QualityCheckResult } from '../../types';
import { DashboardCard } from '../DashboardCard';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '../icons';

const StatusIcon: React.FC<{ status: QualityCheckResult['status'] }> = ({ status }) => {
  if (status === 'Pass') return <CheckCircleIcon className="text-green-400" />;
  if (status === 'Fail') return <XCircleIcon className="text-red-400" />;
  if (status === 'Warning') return <ExclamationTriangleIcon className="text-yellow-400" />;
  return <ExclamationTriangleIcon className="text-slate-500" />; // N/A or other
};

export const DataQualitySection: React.FC<{ checks: QualityCheckResult[] }> = ({ checks }) => {
  return (
    <DashboardCard title="Data Quality & Best Practice Checks"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
      collapsible={true} defaultCollapsed={true}
    >
      {checks.length === 0 && <p className="text-slate-400">No specific data quality checks performed or data available from AI.</p>}
      <div className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className="p-3 bg-slate-700/40 rounded-md flex items-start space-x-3">
            <div className="flex-shrink-0 pt-0.5">
              <StatusIcon status={check.status} />
            </div>
            <div>
              <h5 className="font-semibold text-slate-100">{check.checkName} - <span className={`font-normal ${
                check.status === 'Pass' ? 'text-green-400' :
                check.status === 'Fail' ? 'text-red-400' :
                check.status === 'Warning' ? 'text-yellow-400' : 'text-slate-400'
              }`}>{check.status}</span></h5>
              <p className="text-sm text-slate-400">{check.details}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
    