import React, { useState } from 'react';
import { Brain, Upload, Download, AlertTriangle, CheckCircle, TrendingUp, Sparkles, Target } from 'lucide-react';
import { EthicalDilemma, EthicalAnalysis } from '../types/EthicalAnalysis';
import { ethicalAnalyzer } from '../utils/ethicalAnalyzer';
import { ETHICAL_FRAMEWORKS, getFrameworkColor } from '../utils/ethicalFrameworks';
import DilemmaBuilder from './DilemmaBuilder';
import FrameworkScoreCard from './FrameworkScoreCard';

export default function EthicalAnalysisView() {
  const [currentDilemma, setCurrentDilemma] = useState<EthicalDilemma | null>(null);
  const [analysis, setAnalysis] = useState<EthicalAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showBuilder, setShowBuilder] = useState(true);

  const handleAnalyzeDilemma = async (dilemma: EthicalDilemma) => {
    setCurrentDilemma(dilemma);
    setIsAnalyzing(true);
    setShowBuilder(false);

    try {
      const result = await ethicalAnalyzer.analyzeDilemma(dilemma);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing dilemma:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setCurrentDilemma(null);
    setAnalysis(null);
    setShowBuilder(true);
  };

  const exportAnalysis = () => {
    if (!analysis || !currentDilemma) return;
    
    const report = {
      dilemma: currentDilemma,
      analysis: analysis,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ethical-analysis-${currentDilemma.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 overflow-y-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ethical Analysis</h2>
              <p className="text-gray-600 flex items-center space-x-1">
                <Target className="w-4 h-4 text-purple-500" />
                <span>Multi-framework moral reasoning</span>
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {analysis && (
              <button
                onClick={exportAnalysis}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Export Report</span>
              </button>
            )}
            <button
              onClick={handleNewAnalysis}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-5 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span className="font-medium">New Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {showBuilder ? (
          <DilemmaBuilder onAnalyze={handleAnalyzeDilemma} />
        ) : (
          <div className="space-y-6">
            {/* Dilemma Summary */}
            {currentDilemma && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentDilemma.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{currentDilemma.scenario}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Decision Options</span>
                    </h4>
                    <ul className="space-y-3">
                      {currentDilemma.options.map((option, index) => (
                        <li key={option.id} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{option.title}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50/80 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Stakeholders</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentDilemma.stakeholders.map((stakeholder) => (
                        <span
                          key={stakeholder}
                          className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-sm px-4 py-2 rounded-full font-medium border border-purple-200/50"
                        >
                          {stakeholder}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Loading */}
            {isAnalyzing && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-200/50 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analyzing Your Dilemma</h3>
                <p className="text-gray-600 mb-4">Applying multiple ethical frameworks for comprehensive analysis...</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-6">
                {/* Framework Scores */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {analysis.scores.map((score) => (
                    <FrameworkScoreCard key={score.framework} score={score} />
                  ))}
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 rounded-3xl p-8 border border-green-200/50 shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Recommendation</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">{analysis.recommendation.reasoning}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Confidence Level:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 max-w-xs">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${analysis.recommendation.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {(analysis.recommendation.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Risk Assessment */}
                {analysis.risks.length > 0 && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Risk Assessment</h3>
                    </div>
                    <div className="space-y-4">
                      {analysis.risks.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50/80 rounded-2xl border border-gray-200/50">
                          <div className={`w-4 h-4 rounded-full mt-1 shadow-sm ${
                            risk.type === 'high' ? 'bg-red-500' :
                            risk.type === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-gray-900 font-semibold mb-2">{risk.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">Likelihood:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${risk.likelihood * 100}%` }}
                                  />
                                </div>
                                <span className="font-medium text-gray-900">{(risk.likelihood * 100).toFixed(0)}%</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">Impact:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${risk.impact * 100}%` }}
                                  />
                                </div>
                                <span className="font-medium text-gray-900">{(risk.impact * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Executive Summary</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">{analysis.summary}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}