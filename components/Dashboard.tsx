import React from 'react';
import { AuditResults } from '../types';
import { ExecutiveSummary } from './dashboard/ExecutiveSummary';
import { PlatformDeepDive } from './dashboard/PlatformDeepDive';
import { FunnelDisplay } from './dashboard/FunnelDisplay';
import { DataQualitySection } from './dashboard/DataQualitySection';
import { CookieAuditTable } from './dashboard/CookieAuditTable';
import { PiiOverviewSection } from './dashboard/PiiOverviewSection';
import { SeoPerformanceSignals } from './dashboard/SeoPerformanceSignals';
import { AiPoweredInsights } from './dashboard/AiPoweredInsights';
import { IndustryRecommendations } from './dashboard/IndustryRecommendations'; // Import new component

interface DashboardProps {
  results: AuditResults;
}

export const Dashboard: React.FC<DashboardProps> = ({ results }) => {
  if (!results) {
    return <p className="text-center text-slate-400">No audit data to display.</p>;
  }

  return (
    <div className="space-y-8">
      {results.executiveSummary && <ExecutiveSummary summary={results.executiveSummary} />}
      {results.aiGeneratedInsights && <AiPoweredInsights insights={results.aiGeneratedInsights} />}
      {results.industryAnalysis && <IndustryRecommendations analysis={results.industryAnalysis} />} 
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {results.platformDetails && <PlatformDeepDive platforms={results.platformDetails} />}
        {results.funnelVisualization && <FunnelDisplay funnel={results.funnelVisualization} />}
      </div>
      
      {results.dataQualityChecks && <DataQualitySection checks={results.dataQualityChecks} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.cookieAudit && <CookieAuditTable audit={results.cookieAudit} />}
        {results.piiHandling && <PiiOverviewSection piiData={results.piiHandling} />}
        {results.seoPerformanceImpact && <SeoPerformanceSignals seoData={results.seoPerformanceImpact} />}
      </div>
    </div>
  );
};