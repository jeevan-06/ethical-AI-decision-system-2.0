export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  aiModel?: AIModel;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export type AIModel = 'gpt-4' | 'claude-3' | 'gemini-pro';

export interface AIModelInfo {
  id: AIModel;
  name: string;
  description: string;
  color: string;
  strengths: string[];
}