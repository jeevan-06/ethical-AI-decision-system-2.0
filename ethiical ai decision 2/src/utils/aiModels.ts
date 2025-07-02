import { AIModel, AIModelInfo } from '../types/ChatMessage';

export const AI_MODELS: Record<AIModel, AIModelInfo> = {
  'gpt-4': {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Advanced reasoning and comprehensive analysis',
    color: 'bg-green-500',
    strengths: ['Complex reasoning', 'Detailed explanations', 'Broad knowledge']
  },
  'claude-3': {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Thoughtful and nuanced ethical reasoning',
    color: 'bg-purple-500',
    strengths: ['Ethical reasoning', 'Balanced perspectives', 'Safety-focused']
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multi-modal analysis and creative insights',
    color: 'bg-blue-500',
    strengths: ['Creative solutions', 'Multi-perspective', 'Efficient processing']
  }
};

export class AIService {
  async generateResponse(message: string, model: AIModel): Promise<string> {
    // Simulate AI response with realistic delays
    await this.simulateDelay(1000, 3000);
    
    return this.getMockResponse(message, model);
  }

  async analyzeEthicalDilemma(scenario: string, model: AIModel): Promise<string> {
    await this.simulateDelay(2000, 4000);
    
    const responses = {
      'gpt-4': `From an analytical perspective, this scenario presents several key ethical considerations:\n\n1. **Stakeholder Impact**: We must consider how each option affects all parties involved.\n2. **Long-term Consequences**: The decision should account for both immediate and future implications.\n3. **Moral Principles**: Universal ethical principles should guide our reasoning.\n\nI recommend a balanced approach that prioritizes transparency and stakeholder consultation.`,
      
      'claude-3': `This is a nuanced ethical situation that requires careful consideration of multiple moral frameworks:\n\n**Utilitarian Analysis**: Which option creates the greatest good for the greatest number?\n**Deontological Perspective**: What are our fundamental duties and obligations?\n**Care Ethics**: How do we maintain relationships and show empathy?\n\nI suggest focusing on the solution that best honors human dignity while achieving practical outcomes.`,
      
      'gemini-pro': `Looking at this dilemma through multiple lenses reveals interesting insights:\n\n• **Risk Assessment**: Each option carries different probability-weighted outcomes\n• **Innovation Potential**: Consider creative alternatives that haven't been explored\n• **Systemic Impact**: How does this decision affect broader systems and patterns?\n\nA hybrid approach combining elements from different options might yield the most innovative and ethical solution.`
    };

    return responses[model] || responses['gpt-4'];
  }

  private async simulateDelay(min: number, max: number): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  private getMockResponse(message: string, model: AIModel): string {
    const responses = {
      'gpt-4': "I understand you're seeking guidance on this ethical matter. Let me provide a comprehensive analysis considering multiple perspectives and potential outcomes.",
      'claude-3': "Thank you for sharing this ethical dilemma with me. I'll approach this thoughtfully, considering the various stakeholders and moral principles involved.",
      'gemini-pro': "Interesting ethical question! Let me explore this from several angles and suggest some creative approaches you might not have considered."
    };

    return responses[model] + ` Based on your message about "${message.substring(0, 50)}...", here's my analysis and recommendations.`;
  }
}

export const aiService = new AIService();