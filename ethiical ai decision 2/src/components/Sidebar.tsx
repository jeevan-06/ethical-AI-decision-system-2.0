import React from 'react';
import { MessageSquare, Brain, Settings, Plus, History, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: 'chat' | 'analysis' | 'history';
  onTabChange: (tab: 'chat' | 'analysis' | 'history') => void;
  onNewChat: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onNewChat }: SidebarProps) {
  const tabs = [
    { 
      id: 'chat', 
      label: 'AI Chat', 
      icon: MessageSquare, 
      description: 'Conversational guidance',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'analysis', 
      label: 'Ethical Analysis', 
      icon: Brain, 
      description: 'Multi-framework reasoning',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'history', 
      label: 'History', 
      icon: History, 
      description: 'Past conversations',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col h-full shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-100/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              EthicalAI
            </h1>
            <p className="text-sm text-gray-500 font-medium">Moral Decision Support</p>
          </div>
        </div>
        
        <button
          onClick={onNewChat}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center space-x-3">
            <Plus className="w-5 h-5" />
            <span className="font-semibold">New Conversation</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as any)}
                className={`w-full group relative overflow-hidden p-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50 shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${tab.gradient} shadow-lg` 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className={`font-semibold transition-colors ${
                      isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {tab.label}
                    </div>
                    <div className={`text-xs transition-colors ${
                      isActive ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </div>
                  </div>
                </div>
                
                {isActive && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-gray-100/50">
        <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50/80 rounded-xl transition-all duration-200 hover:text-gray-900 group">
          <div className="p-2 bg-gray-100 group-hover:bg-gray-200 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </div>
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}