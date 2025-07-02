import React from 'react';
import { ChevronDown, Sparkles, Zap, Brain } from 'lucide-react';
import { AIModel } from '../types/ChatMessage';
import { AI_MODELS } from '../utils/aiModels';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentModel = AI_MODELS[selectedModel];

  const modelIcons = {
    'gpt-4': Sparkles,
    'claude-3': Brain,
    'gemini-pro': Zap
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 px-4 py-3 rounded-2xl transition-all duration-200 border border-gray-200/50 shadow-sm hover:shadow-md group"
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${currentModel.color} shadow-sm`}>
          {React.createElement(modelIcons[selectedModel] || Brain, { className: "w-4 h-4 text-white" })}
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-gray-900">{currentModel.name}</div>
          <div className="text-xs text-gray-500">AI Model</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 py-3 z-50 animate-fadeIn">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Choose AI Model</h3>
            <p className="text-xs text-gray-500">Each model has unique strengths</p>
          </div>
          
          {Object.values(AI_MODELS).map((model) => {
            const Icon = modelIcons[model.id as keyof typeof modelIcons] || Brain;
            const isSelected = selectedModel === model.id;
            
            return (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-4 text-left hover:bg-gray-50/80 transition-all duration-200 ${
                  isSelected ? 'bg-purple-50/80 border-r-2 border-purple-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${model.color} shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{model.name}</span>
                      {isSelected && <CheckCircle className="w-4 h-4 text-purple-500" />}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{model.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {model.strengths.map((strength) => (
                        <span
                          key={strength}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isSelected 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}