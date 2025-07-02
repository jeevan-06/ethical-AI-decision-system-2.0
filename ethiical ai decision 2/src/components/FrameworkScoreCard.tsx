import React from 'react';
import { Users, Scale, Heart, HandHeart, Ambulance as Balance, Sparkles } from 'lucide-react';
import { FrameworkScore } from '../types/EthicalAnalysis';
import { getFrameworkByld } from '../utils/ethicalFrameworks';

interface FrameworkScoreCardProps {
  score: FrameworkScore;
}

const frameworkIcons = {
  utilitarian: Users,
  deontological: Scale,
  virtue: Heart,
  care: HandHeart,
  justice: Balance
};

const frameworkGradients = {
  utilitarian: 'from-blue-500 to-cyan-500',
  deontological: 'from-purple-500 to-indigo-500',
  virtue: 'from-green-500 to-emerald-500',
  care: 'from-pink-500 to-rose-500',
  justice: 'from-orange-500 to-amber-500'
};

export default function FrameworkScoreCard({ score }: FrameworkScoreCardProps) {
  const framework = getFrameworkByld(score.framework);
  const Icon = frameworkIcons[score.framework as keyof typeof frameworkIcons] || Scale;
  const gradient = frameworkGradients[score.framework as keyof typeof frameworkGradients] || 'from-gray-500 to-gray-600';
  const percentage = Math.round(score.score * 100);
  
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'from-green-500 to-emerald-600';
    if (score >= 0.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 0.7) return 'text-green-700';
    if (score >= 0.5) return 'text-orange-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{framework?.name || score.framework}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{framework?.description}</p>
          </div>
        </div>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={`${percentage * 2.51} 251`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={score.score >= 0.7 ? '#10b981' : score.score >= 0.5 ? '#f59e0b' : '#ef4444'} />
                <stop offset="100%" stopColor={score.score >= 0.7 ? '#059669' : score.score >= 0.5 ? '#d97706' : '#dc2626'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className={`text-3xl font-bold ${getScoreTextColor(score.score)}`}>
                {percentage}%
              </span>
              <div className="flex items-center justify-center mt-1">
                <Sparkles className="w-3 h-3 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="space-y-4">
        <div className="bg-gray-50/80 rounded-2xl p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{score.explanation}</p>
        </div>
        
        {/* Confidence */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Analysis Confidence</span>
          <span className="font-bold text-gray-900">{Math.round(score.confidence * 100)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${gradient} h-2 rounded-full transition-all duration-500 shadow-sm`}
            style={{ width: `${score.confidence * 100}%` }}
          />
        </div>

        {/* Reasoning Points */}
        {score.reasoning && score.reasoning.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Key Considerations</h4>
            <ul className="space-y-2">
              {score.reasoning.slice(0, 3).map((reason, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-3">
                  <div className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full mt-2 flex-shrink-0`} />
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}