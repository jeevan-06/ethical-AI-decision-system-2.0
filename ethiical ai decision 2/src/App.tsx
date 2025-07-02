import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import EthicalAnalysisView from './components/EthicalAnalysisView';
import HistoryView from './components/HistoryView';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'analysis' | 'history'>('chat');

  const handleNewChat = () => {
    setActiveTab('chat');
    // Additional logic for starting a new chat session could go here
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'analysis':
        return <EthicalAnalysisView />;
      case 'history':
        return <HistoryView />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onNewChat={handleNewChat}
      />
      {renderActiveView()}
    </div>
  );
}

export default App;