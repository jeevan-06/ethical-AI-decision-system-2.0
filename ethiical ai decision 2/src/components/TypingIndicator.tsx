import React from 'react';
import { Bot } from 'lucide-react';
import { AI_MODELS } from '../utils/aiModels';
import { AIModel } from '../types/ChatMessage';

interface TypingIndicatorProps {
  model: AIModel;
}

export default function TypingIndicator({ model }: TypingIndicatorProps) {
  const modelInfo = AI_MODELS[model];

  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex max-w-[80%] space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${modelInfo.color}`}>
            <Bot className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Typing bubble */}
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 mb-1 font-medium">
            {modelInfo.name}
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}