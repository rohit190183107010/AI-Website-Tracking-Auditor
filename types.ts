export interface ExecutiveSummaryData {
  healthScore: string;
  totalPixels: string;
  totalTags: string;
  totalCookies: string;
  criticalErrors: string;
  warnings: string;
  keyOpportunities: string[];
  lastScanned: string;
}

export interface EventInfo {
  eventName: string;
  status: 'Detected' | 'Missing' | 'Partially Detected' | 'Error';
  parametersPresent?: string[];
  parametersMissing?: string[];
  notes?: string;
}

export interface ParameterCompleteness {
  event: string;
  parameter: string;
  status: 'Present' | 'Missing' | 'Warning';
  valueExample?: string;
  recommendation?: string;
}

export interface CapiBrowserComparisonEvent {
  eventName: string;
  count?: number;
  volume?: string; // e.g. "High", "Low"
}
export interface CapiBrowserComparisonData {
  notes: string;
  browserEvents: CapiBrowserComparisonEvent[];
  capiEvents: CapiBrowserComparisonEvent[];
}

export interface EMQParameter {
  parameter: string;
  event: string;
  fillRate: string;
  status?: 'Good' | 'Needs Improvement' | 'N/A';
}
export interface EMQBreakdownData {
  notes: string;
  parameters: EMQParameter[];
}

export interface PlatformDetailData {
  platformName: string;
  pixelId?: string; // Can be Meta Pixel ID, GA4 Measurement ID, GTM Container ID, Snap Pixel ID, etc.
  status: string;
  events: EventInfo[];
  parameterCompleteness?: ParameterCompleteness[];
  capiBrowserComparison?: CapiBrowserComparisonData;
  emqBreakdown?: EMQBreakdownData;
  notes?: string;
}

export interface FunnelStep {
  eventName: string;
  status: 'Detected' | 'Missing' | 'Partially Detected';
  notes?: string;
}

export interface FunnelVisualizationData {
  funnelName: string;
  steps: FunnelStep[];
  health: string;
  recommendations: string[];
}

export interface QualityCheckResult {
  checkName: string;
  status: 'Pass' | 'Fail' | 'Warning' | 'N/A';
  details: string;
}

export interface CookieInfo {
  name: string;
  domain: string;
  lifespan: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
  type: string;
  purpose?: string;
}

export interface CookieAuditData {
  cmpDetected: string;
  cookies: CookieInfo[];
}

export interface PiiHandlingData {
  alerts: string[];
  recommendations: string[];
}

export interface SeoPerformanceImpactData {
  notes: string;
  impactLevel: string;
}

export interface AiGeneratedInsightsData {
  overallSummary: string;
  actionableRecommendations: string[];
  complianceNotes?: string;
  rawAnalysis?: string; // For debugging or further details
}

export interface IndustryRecommendedEvent {
  eventName: string;
  platformSuggestion: string; // e.g., "Meta, GA4, Google Ads"
  reasoning: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface IndustryAnalysisData {
  detectedIndustry: string; // e.g., "E-commerce (Fashion)", "SaaS (B2B Software)"
  recommendedEvents: IndustryRecommendedEvent[];
  generalNotes?: string; // Other marketer-focused advice based on industry
}

export interface AuditResults {
  executiveSummary: ExecutiveSummaryData;
  platformDetails: PlatformDetailData[];
  funnelVisualization: FunnelVisualizationData;
  dataQualityChecks: QualityCheckResult[];
  cookieAudit: CookieAuditData;
  piiHandling: PiiHandlingData;
  seoPerformanceImpact: SeoPerformanceImpactData;
  aiGeneratedInsights: AiGeneratedInsightsData;
  industryAnalysis?: IndustryAnalysisData; // New field
}

export enum LoadingState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}