
import React from 'react';
import { FunnelVisualizationData, FunnelStep } from '../../types';
import { DashboardCard } from '../DashboardCard';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '../icons';

const FunnelStepDisplay: React.FC<{ step: FunnelStep; isLast: boolean }> = ({ step, isLast }) => {
  const getStatusIcon = () => {
    if (step.status === 'Detected') return <CheckCircleIcon className="text-green-400" />;
    if (step.status === 'Missing') return <XCircleIcon className="text-red-400" />;
    if (step.status === 'Partially Detected') return <ExclamationTriangleIcon className="text-yellow-400" />;
    return null;
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold ring-2 ring-sky-600 shadow-md">
          {getStatusIcon() || 'N/A'}
        </div>
        {!isLast && <div className="w-px h-16 bg-slate-600 my-1"></div>}
      </div>
      <div className="pt-1">
        <p className="font-semibold text-slate-100">{step.eventName}</p>
        <p className="text-sm text-slate-400">{step.status}</p>
        {step.notes && <p className="text-xs text-slate-500 mt-0.5">{step.notes}</p>}
      </div>
    </div>
  );
};

export const FunnelDisplay: React.FC<{ funnel: FunnelVisualizationData }> = ({ funnel }) => {
  return (
    <DashboardCard title={`Funnel: ${funnel.funnelName}`}
       icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
       collapsible={true}
    >
      <div className="mb-4">
        <p className="text-slate-300"><strong>Overall Health:</strong> <span className={`font-semibold ${funnel.health.toLowerCase().includes('good') ? 'text-green-400' : 'text-yellow-400'}`}>{funnel.health}</span></p>
      </div>
      <div className="space-y-0"> {/* No space between steps for connector line */}
        {funnel.steps.map((step, index) => (
          <FunnelStepDisplay key={index} step={step} isLast={index === funnel.steps.length - 1} />
        ))}
      </div>
      {funnel.recommendations.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-sky-400 mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            {funnel.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </DashboardCard>
  );
};
    