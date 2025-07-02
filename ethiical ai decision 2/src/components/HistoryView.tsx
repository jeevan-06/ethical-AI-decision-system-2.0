import React from 'react';
import { Clock, MessageSquare, Brain, FileX, Calendar, TrendingUp } from 'lucide-react';

export default function HistoryView() {
  const conversations = [
    {
      id: '1',
      title: 'Healthcare Resource Allocation',
      type: 'analysis',
      preview: 'Should we prioritize patient care or cost reduction in our hospital system during budget constraints?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      frameworks: ['Utilitarian', 'Deontological', 'Care Ethics'],
      confidence: 0.85
    },
    {
      id: '2',
      title: 'AI Ethics in Hiring',
      type: 'chat',
      preview: 'What are the ethical implications of using AI algorithms for hiring decisions in our company?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      model: 'Claude 3',
      messageCount: 12
    },
    {
      id: '3',
      title: 'Environmental vs Economic Policy',
      type: 'analysis',
      preview: 'Balancing environmental protection with economic growth in municipal policy making.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      frameworks: ['Utilitarian', 'Justice', 'Virtue Ethics'],
      confidence: 0.72
    },
    {
      id: '4',
      title: 'Data Privacy Discussion',
      type: 'chat',
      preview: 'How should we handle user data privacy while maintaining personalized services?',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      model: 'GPT-4',
      messageCount: 8
    }
  ];

  if (conversations.length === 0) {
    return (
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileX className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No History Yet</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your conversations and ethical analyses will appear here once you start using the system.
          </p>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 border border-purple-200/50">
            <p className="text-sm text-purple-700 font-medium">
              💡 Start a conversation or create an ethical analysis to build your history
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 overflow-y-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">History</h2>
              <p className="text-gray-600 flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-green-500" />
                <span>Your past conversations and analyses</span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{conversations.length}</div>
            <div className="text-sm text-gray-500">Total Sessions</div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="p-6">
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      conversation.type === 'analysis' 
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600' 
                        : 'bg-gradient-to-br from-blue-600 to-cyan-600'
                    }`}>
                      {conversation.type === 'analysis' ? (
                        <Brain className="w-6 h-6 text-white" />
                      ) : (
                        <MessageSquare className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {conversation.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(conversation.timestamp)}</span>
                        </span>
                        
                        {conversation.type === 'analysis' && conversation.frameworks && (
                          <span className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>{conversation.frameworks.length} frameworks</span>
                          </span>
                        )}
                        
                        {conversation.type === 'chat' && conversation.messageCount && (
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{conversation.messageCount} messages</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                    {conversation.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {conversation.type === 'analysis' && conversation.frameworks && (
                        <div className="flex flex-wrap gap-2">
                          {conversation.frameworks.map((framework) => (
                            <span
                              key={framework}
                              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium border border-purple-200/50"
                            >
                              {framework}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {conversation.type === 'chat' && conversation.model && (
                        <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200/50">
                          via {conversation.model}
                        </span>
                      )}
                    </div>
                    
                    {conversation.type === 'analysis' && conversation.confidence && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Confidence:</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${conversation.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {Math.round(conversation.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 px-8 py-3 rounded-2xl transition-all duration-200 border border-gray-200/50 shadow-sm hover:shadow-md font-medium">
            Load More History
          </button>
        </div>
      </div>
    </div>
  );
}