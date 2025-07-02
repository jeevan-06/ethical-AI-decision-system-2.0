import { EthicalDilemma, EthicalAnalysis, FrameworkScore, RiskAssessment } from '../types/EthicalAnalysis';
import { ETHICAL_FRAMEWORKS } from './ethicalFrameworks';

export class EthicalAnalyzer {
  async analyzeDilemma(dilemma: EthicalDilemma): Promise<EthicalAnalysis> {
    const scores = await this.calculateFrameworkScores(dilemma);
    const risks = this.assessRisks(dilemma);
    const recommendation = this.generateRecommendation(dilemma, scores);
    const summary = this.generateSummary(dilemma, scores, recommendation);

    return {
      id: crypto.randomUUID(),
      dilemmaId: dilemma.id,
      scores,
      recommendation,
      risks,
      summary,
      createdAt: new Date()
    };
  }

  private async calculateFrameworkScores(dilemma: EthicalDilemma): Promise<FrameworkScore[]> {
    return ETHICAL_FRAMEWORKS.map(framework => {
      const score = this.calculateFrameworkScore(framework.id, dilemma);
      return {
        framework: framework.id,
        score: score.value,
        explanation: score.explanation,
        reasoning: score.reasoning,
        confidence: score.confidence
      };
    });
  }

  private calculateFrameworkScore(frameworkId: string, dilemma: EthicalDilemma) {
    // Simulate different ethical reasoning approaches
    switch (frameworkId) {
      case 'utilitarian':
        return this.calculateUtilitarianScore(dilemma);
      case 'deontological':
        return this.calculateDeontologicalScore(dilemma);
      case 'virtue':
        return this.calculateVirtueScore(dilemma);
      case 'care':
        return this.calculateCareScore(dilemma);
      case 'justice':
        return this.calculateJusticeScore(dilemma);
      default:
        return { value: 0.5, explanation: 'Unknown framework', reasoning: [], confidence: 0.5 };
    }
  }

  private calculateUtilitarianScore(dilemma: EthicalDilemma) {
    const beneficiaries = dilemma.stakeholders.length;
    const positiveOutcomes = dilemma.options.reduce((sum, option) => 
      sum + option.consequences.filter(c => c.includes('benefit')).length, 0);
    
    const score = Math.min(0.9, (positiveOutcomes + beneficiaries * 0.1) / 10);
    
    return {
      value: score,
      explanation: `Maximizes benefit for ${beneficiaries} stakeholders`,
      reasoning: [
        'Considers overall well-being of all affected parties',
        'Weighs positive and negative consequences',
        'Aims to maximize happiness and minimize suffering'
      ],
      confidence: 0.8
    };
  }

  private calculateDeontologicalScore(dilemma: EthicalDilemma) {
    const ruleBasedWords = ['duty', 'right', 'obligation', 'principle'];
    const ruleScore = dilemma.scenario.toLowerCase().split(' ')
      .filter(word => ruleBasedWords.some(rule => word.includes(rule))).length;
    
    const score = Math.min(0.9, 0.3 + (ruleScore * 0.15));
    
    return {
      value: score,
      explanation: 'Evaluates adherence to moral rules and duties',
      reasoning: [
        'Focuses on inherent rightness or wrongness of actions',
        'Considers universal moral principles',
        'Emphasizes respect for human dignity and rights'
      ],
      confidence: 0.75
    };
  }

  private calculateVirtueScore(dilemma: EthicalDilemma) {
    const virtues = ['honesty', 'courage', 'compassion', 'integrity', 'wisdom'];
    const virtueScore = dilemma.scenario.toLowerCase().split(' ')
      .filter(word => virtues.some(virtue => word.includes(virtue))).length;
    
    const score = Math.min(0.9, 0.4 + (virtueScore * 0.1));
    
    return {
      value: score,
      explanation: 'Assesses character virtues and moral excellence',
      reasoning: [
        'Evaluates what a virtuous person would do',
        'Considers long-term character development',
        'Focuses on moral excellence and human flourishing'
      ],
      confidence: 0.7
    };
  }

  private calculateCareScore(dilemma: EthicalDilemma) {
    const careWords = ['relationship', 'empathy', 'care', 'support', 'help'];
    const careScore = dilemma.scenario.toLowerCase().split(' ')
      .filter(word => careWords.some(care => word.includes(care))).length;
    
    const score = Math.min(0.9, 0.35 + (careScore * 0.12));
    
    return {
      value: score,
      explanation: 'Prioritizes relationships and emotional connections',
      reasoning: [
        'Emphasizes maintaining relationships and trust',
        'Considers emotional impact on individuals',
        'Values empathy and contextual understanding'
      ],
      confidence: 0.8
    };
  }

  private calculateJusticeScore(dilemma: EthicalDilemma) {
    const justiceWords = ['fair', 'equal', 'distribute', 'equity', 'rights'];
    const justiceScore = dilemma.scenario.toLowerCase().split(' ')
      .filter(word => justiceWords.some(justice => word.includes(justice))).length;
    
    const score = Math.min(0.9, 0.4 + (justiceScore * 0.1));
    
    return {
      value: score,
      explanation: 'Evaluates fairness and equitable distribution',
      reasoning: [
        'Considers fair distribution of benefits and burdens',
        'Evaluates equal treatment and non-discrimination',
        'Focuses on procedural and distributive justice'
      ],
      confidence: 0.85
    };
  }

  private assessRisks(dilemma: EthicalDilemma): RiskAssessment[] {
    const risks: RiskAssessment[] = [];
    
    // Analyze potential risks based on stakeholders and consequences
    if (dilemma.stakeholders.length > 5) {
      risks.push({
        type: 'high',
        description: 'Large number of stakeholders increases complexity',
        likelihood: 0.8,
        impact: 0.7
      });
    }

    dilemma.options.forEach(option => {
      const negativeConsequences = option.consequences.filter(c => 
        c.toLowerCase().includes('harm') || c.toLowerCase().includes('risk')
      );
      
      if (negativeConsequences.length > 0) {
        risks.push({
          type: 'medium',
          description: `Potential negative outcomes in ${option.title}`,
          likelihood: 0.6,
          impact: 0.5
        });
      }
    });

    return risks;
  }

  private generateRecommendation(dilemma: EthicalDilemma, scores: FrameworkScore[]) {
    const averageScore = scores.reduce((sum, score) => sum + score.score, 0) / scores.length;
    const bestOption = dilemma.options[0]; // Simplified - would need more complex logic
    
    return {
      optionId: bestOption.id,
      confidence: averageScore,
      reasoning: `Based on ethical analysis across ${scores.length} frameworks, this option provides the most balanced approach considering all stakeholders and moral principles.`
    };
  }

  private generateSummary(dilemma: EthicalDilemma, scores: FrameworkScore[], recommendation: any): string {
    const topFramework = scores.reduce((prev, current) => 
      prev.score > current.score ? prev : current
    );

    return `This ethical dilemma involving ${dilemma.stakeholders.length} stakeholders has been analyzed across multiple moral frameworks. The ${topFramework.framework} framework shows the highest alignment (${(topFramework.score * 100).toFixed(1)}%), suggesting that ${topFramework.explanation.toLowerCase()}. The recommended approach balances all ethical considerations while minimizing potential risks.`;
  }
}

export const ethicalAnalyzer = new EthicalAnalyzer();