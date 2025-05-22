
import React from 'react';
import { SeoPerformanceImpactData } from '../../types';
import { DashboardCard } from '../DashboardCard';

export const SeoPerformanceSignals: React.FC<{ seoData: SeoPerformanceImpactData }> = ({ seoData }) => {
  return (
    <DashboardCard title="SEO & Performance Signals"
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
      collapsible={true} defaultCollapsed={true}
    >
      <p className="mb-2 text-slate-300"><strong>Potential Impact Level:</strong> <span className="font-semibold text-yellow-300">{seoData.impactLevel}</span></p>
      <p className="text-sm text-slate-400">{seoData.notes}</p>
    </DashboardCard>
  );
};
    