import React from 'react';
import { IndustryAnalysisData, IndustryRecommendedEvent } from '../../types';
import { DashboardCard } from '../DashboardCard';
import { CheckCircleIcon, ExclamationTriangleIcon } from '../icons'; // Assuming these icons are suitable

const PriorityBadge: React.FC<{ priority: IndustryRecommendedEvent['priority'] }> = ({ priority }) => {
  let bgColor = 'bg-slate-600';
  let textColor = 'text-slate-200';
  if (priority === 'High') {
    bgColor = 'bg-red-500/30';
    textColor = 'text-red-300';
  } else if (priority === 'Medium') {
    bgColor = 'bg-yellow-500/30';
    textColor = 'text-yellow-300';
  } else if (priority === 'Low') {
    bgColor = 'bg-sky-500/30';
    textColor = 'text-sky-300';
  }
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>{priority}</span>;
};


export const IndustryRecommendations: React.FC<{ analysis: IndustryAnalysisData }> = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  return (
    <DashboardCard 
      title="Industry Analysis & Event Recommendations"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-12a2.25 2.25 0 012.25-2.25h4.073M20.25 14.15c0-2.243-1.833-4.073-4.073-4.073M16.177 10.077L20.25 6M20.25 6H16.177m4.073 0v4.073" /></svg>}
      collapsible={true}
      defaultCollapsed={false}
    >
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-sky-400 mb-1">Detected Industry:</h4>
        <p className="text-slate-200 text-xl font-medium">{analysis.detectedIndustry || 'Not specified by AI'}</p>
      </div>

      {analysis.recommendedEvents && analysis.recommendedEvents.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-sky-400 mb-3">Recommended Events for this Industry:</h4>
          <div className="space-y-4">
            {analysis.recommendedEvents.map((event, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-lg shadow">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="text-md font-semibold text-slate-100">{event.eventName}</h5>
                  <PriorityBadge priority={event.priority} />
                </div>
                <p className="text-sm text-slate-400 mb-1">
                  <strong>Suggest for Platforms:</strong> {event.platformSuggestion}
                </p>
                <p className="text-sm text-slate-400">
                  <strong>Reasoning:</strong> {event.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
       {(!analysis.recommendedEvents || analysis.recommendedEvents.length === 0) && (
         <p className="text-slate-400 mb-6">No specific event recommendations provided by the AI for this industry.</p>
       )}

      {analysis.generalNotes && (
        <div>
          <h4 className="text-lg font-semibold text-sky-400 mb-2">Industry Insights:</h4>
          <p className="text-slate-300">{analysis.generalNotes}</p>
        </div>
      )}
    </DashboardCard>
  );
};