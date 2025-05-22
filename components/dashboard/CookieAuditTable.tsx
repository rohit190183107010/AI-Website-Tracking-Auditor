
import React from 'react';
import { CookieAuditData, CookieInfo } from '../../types';
import { DashboardCard } from '../DashboardCard';

export const CookieAuditTable: React.FC<{ audit: CookieAuditData }> = ({ audit }) => {
  return (
    <DashboardCard title="Cookie & CMP Audit"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 M3 9V7.5A2.25 2.25 0 015.25 5h13.5A2.25 2.25 0 0121 7.5V9M3 13.5V12A2.25 2.25 0 015.25 9.75h13.5A2.25 2.25 0 0121 12v1.5" /></svg>}
      collapsible={true} defaultCollapsed={true}
    >
      <p className="mb-4 text-slate-300"><strong>Consent Management Platform (CMP):</strong> {audit.cmpDetected || 'Not specified'}</p>
      {audit.cookies.length === 0 && <p className="text-slate-400">No marketing cookies detected or data available from AI.</p>}
      {audit.cookies.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Domain</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Lifespan</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Purpose</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Flags</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {audit.cookies.map((cookie, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-200">{cookie.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-300">{cookie.domain}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-300">{cookie.lifespan}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-300">{cookie.type}</td>
                  <td className="px-4 py-2 text-sm text-slate-400 break-words">{cookie.purpose || 'N/A'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-xs text-slate-400">
                    {cookie.httpOnly && <span className="mr-1.5 px-1.5 py-0.5 bg-sky-700 text-sky-200 rounded-full">HttpOnly</span>}
                    {cookie.secure && <span className="mr-1.5 px-1.5 py-0.5 bg-teal-700 text-teal-200 rounded-full">Secure</span>}
                    {cookie.sameSite && <span className="px-1.5 py-0.5 bg-purple-700 text-purple-200 rounded-full">SameSite: {cookie.sameSite}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardCard>
  );
};
    