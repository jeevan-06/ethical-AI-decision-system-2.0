import React from 'react';
import { Bot, User, CheckCircle } from 'lucide-react';
import { AI_MODELS } from '../utils/aiModels';

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    aiModel?: string;
  };
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const modelInfo = message.aiModel ? AI_MODELS[message.aiModel as keyof typeof AI_MODELS] : null;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} space-x-4`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-4' : 'mr-4'}`}>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
            isUser 
              ? 'bg-gradient-to-br from-purple-600 to-blue-600' 
              : modelInfo?.color || 'bg-gradient-to-br from-gray-600 to-gray-700'
          }`}>
            {isUser ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}>
          {/* Model name for AI messages */}
          {!isUser && modelInfo && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <div className={`w-2 h-2 rounded-full ${modelInfo.color}`} />
              <span>{modelInfo.name}</span>
              <CheckCircle className="w-3 h-3 text-green-500" />
            </div>
          )}
          
          {/* Message bubble */}
          <div className={`relative rounded-3xl px-6 py-4 shadow-lg max-w-none ${
            isUser
              ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
              : 'bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-900'
          }`}>
            {/* Message content */}
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
            
            {/* Message tail */}
            <div className={`absolute w-3 h-3 ${
              isUser 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 -right-1 bottom-4' 
                : 'bg-white -left-1 bottom-4 border-l border-b border-gray-200/50'
            } transform rotate-45`} />
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-400 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}