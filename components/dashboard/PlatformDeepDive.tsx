
import React, { useState } from 'react';
import { PlatformDetailData, EventInfo, ParameterCompleteness, CapiBrowserComparisonData, EMQBreakdownData } from '../../types';
import { DashboardCard } from '../DashboardCard';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '../icons';

const StatusIcon: React.FC<{ status: EventInfo['status'] | ParameterCompleteness['status'] }> = ({ status }) => {
  // Fix: Corrected status checks. 'Detected' and 'Present' for green.
  if (status === 'Detected' || status === 'Present') return <CheckCircleIcon className="text-green-400" />;
  // Fix: Corrected status checks. 'Missing' and 'Error' for red. 'Fail' is not applicable here.
  if (status === 'Missing' || status === 'Error') return <XCircleIcon className="text-red-400" />;
  if (status === 'Partially Detected' || status === 'Warning') return <ExclamationTriangleIcon className="text-yellow-400" />;
  return <ExclamationTriangleIcon className="text-slate-500" />; // Default for N/A or other
};

const PlatformEvents: React.FC<{ events: EventInfo[] }> = ({ events }) => (
  <div className="mt-4">
    <h5 className="text-md font-semibold text-sky-400 mb-2">Events Detected:</h5>
    {events.length > 0 ? (
       <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Event Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Params Present</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Params Missing</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {events.map((event, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-200">{event.eventName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-300">
                  <div className="flex items-center">
                    <StatusIcon status={event.status} /> <span className="ml-2">{event.status}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-slate-400 break-words">{event.parametersPresent?.join(', ') || 'N/A'}</td>
                <td className="px-4 py-2 text-sm text-slate-400 break-words">{event.parametersMissing?.join(', ') || 'N/A'}</td>
                <td className="px-4 py-2 text-sm text-slate-400 break-words">{event.notes || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : <p className="text-slate-400">No events data available for this platform.</p>}
  </div>
);

// Other sub-components (ParameterCompletenessDisplay, CapiBrowserComparisonDisplay, EMQBreakdownDisplay) would be similar in structure

export const PlatformDeepDive: React.FC<{ platforms: PlatformDetailData[] }> = ({ platforms }) => {
  const [openPlatform, setOpenPlatform] = useState<string | null>(platforms.length > 0 ? platforms[0].platformName : null);

  return (
    <DashboardCard title="Platform-Specific Deep Dives"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>}
    >
      {platforms.length === 0 && <p className="text-slate-400">No specific platform data detected or provided by the AI.</p>}
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.platformName} className="border border-slate-700 rounded-lg">
            <button
              onClick={() => setOpenPlatform(openPlatform === platform.platformName ? null : platform.platformName)}
              className="w-full p-4 bg-slate-700/70 hover:bg-slate-600/70 text-left text-lg font-semibold text-sky-300 flex justify-between items-center rounded-t-lg"
            >
              {platform.platformName} (Tracking ID: {platform.pixelId || 'N/A'}) - Status: {platform.status}
              <span className={`transform transition-transform duration-200 ${openPlatform === platform.platformName ? 'rotate-180' : 'rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </button>
            {openPlatform === platform.platformName && (
              <div className="p-4 bg-slate-800 rounded-b-lg">
                <PlatformEvents events={platform.events} />
                {platform.parameterCompleteness && platform.parameterCompleteness.length > 0 && (
                   <div className="mt-4">
                    <h5 className="text-md font-semibold text-sky-400 mb-2">Parameter Completeness:</h5>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700">
                           <thead className="bg-slate-700/50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Event</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Parameter</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Recommendation</th>
                            </tr>
                          </thead>
                          <tbody className="bg-slate-800 divide-y divide-slate-700">
                            {platform.parameterCompleteness.map((param, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-200">{param.event}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-200">{param.parameter}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-300">
                                  <div className="flex items-center">
                                    <StatusIcon status={param.status} /> <span className="ml-2">{param.status}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-2 text-sm text-slate-400 break-words">{param.recommendation || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </div>
                )}
                {platform.capiBrowserComparison && (
                  <div className="mt-4">
                    <h5 className="text-md font-semibold text-sky-400 mb-2">CAPI vs Browser Comparison:</h5>
                    <p className="text-sm text-slate-400 mb-2">{platform.capiBrowserComparison.notes}</p>
                    {/* Simplified display, could be a table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div><strong>Browser Events:</strong> {platform.capiBrowserComparison.browserEvents.map(e => `${e.eventName} (${e.volume || e.count || 'N/A'})`).join(', ')}</div>
                        <div><strong>CAPI Events:</strong> {platform.capiBrowserComparison.capiEvents.map(e => `${e.eventName} (${e.volume || e.count || 'N/A'})`).join(', ')}</div>
                    </div>
                  </div>
                )}
                {platform.emqBreakdown && (
                  <div className="mt-4">
                    <h5 className="text-md font-semibold text-sky-400 mb-2">EMQ Breakdown:</h5>
                    <p className="text-sm text-slate-400 mb-2">{platform.emqBreakdown.notes}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {platform.emqBreakdown.parameters.map((param, idx) => (
                        <li key={idx} className="text-slate-300">
                          {param.parameter} for {param.event}: {param.fillRate} <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${param.status === 'Good' ? 'bg-green-500/30 text-green-300' : param.status === 'Needs Improvement' ? 'bg-yellow-500/30 text-yellow-300' : 'bg-slate-600 text-slate-400'}`}>{param.status || ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {platform.notes && (
                  <div className="mt-4">
                    <h5 className="text-md font-semibold text-sky-400 mb-1">Additional Platform Notes:</h5>
                    <p className="text-sm text-slate-400 whitespace-pre-line">{platform.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
