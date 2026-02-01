export interface AnalysisResult {
  url: string;
  fakeScore: number;
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIABLE';
  claims: Claim[];
  summary: string;
  proofSources: ProofSource[];
  executionLog: string[];
  timestamp: string;
}

export interface Claim {
  text: string;
  status: 'VERIFIED' | 'FALSE' | 'UNVERIFIABLE';
  evidence: string;
}

export interface ProofSource {
  title: string;
  url: string;
  relevance: number;
}

export interface AnalysisRequest {
  url: string;
  content?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
