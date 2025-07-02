export interface EthicalFramework {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface FrameworkScore {
  framework: string;
  score: number; // 0-1 scale
  explanation: string;
  reasoning: string[];
  confidence: number;
}

export interface EthicalDilemma {
  id: string;
  title: string;
  scenario: string;
  options: DilemmaOption[];
  stakeholders: string[];
  context?: string;
  timeframe?: string;
  createdAt: Date;
}

export interface DilemmaOption {
  id: string;
  title: string;
  description: string;
  consequences: string[];
}

export interface EthicalAnalysis {
  id: string;
  dilemmaId: string;
  scores: FrameworkScore[];
  recommendation: {
    optionId: string;
    confidence: number;
    reasoning: string;
  };
  risks: RiskAssessment[];
  summary: string;
  createdAt: Date;
}

export interface RiskAssessment {
  type: 'high' | 'medium' | 'low';
  description: string;
  likelihood: number;
  impact: number;
}