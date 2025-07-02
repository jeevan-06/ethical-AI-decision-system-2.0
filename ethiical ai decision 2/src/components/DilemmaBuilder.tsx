import React, { useState } from 'react';
import { Plus, Trash2, Users, AlertCircle } from 'lucide-react';
import { EthicalDilemma, DilemmaOption } from '../types/EthicalAnalysis';

interface DilemmaBuilderProps {
  onAnalyze: (dilemma: EthicalDilemma) => void;
}

export default function DilemmaBuilder({ onAnalyze }: DilemmaBuilderProps) {
  const [title, setTitle] = useState('');
  const [scenario, setScenario] = useState('');
  const [context, setContext] = useState('');
  const [options, setOptions] = useState<DilemmaOption[]>([
    { id: '1', title: '', description: '', consequences: [''] },
    { id: '2', title: '', description: '', consequences: [''] }
  ]);
  const [stakeholders, setStakeholders] = useState<string[]>(['']);

  const addOption = () => {
    const newOption: DilemmaOption = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      consequences: ['']
    };
    setOptions([...options, newOption]);
  };

  const removeOption = (optionId: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== optionId));
    }
  };

  const updateOption = (optionId: string, field: keyof DilemmaOption, value: any) => {
    setOptions(options.map(option => 
      option.id === optionId ? { ...option, [field]: value } : option
    ));
  };

  const addConsequence = (optionId: string) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { ...option, consequences: [...option.consequences, ''] }
        : option
    ));
  };

  const updateConsequence = (optionId: string, index: number, value: string) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { 
            ...option, 
            consequences: option.consequences.map((cons, i) => i === index ? value : cons)
          }
        : option
    ));
  };

  const removeConsequence = (optionId: string, index: number) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { 
            ...option, 
            consequences: option.consequences.length > 1 
              ? option.consequences.filter((_, i) => i !== index)
              : option.consequences
          }
        : option
    ));
  };

  const addStakeholder = () => {
    setStakeholders([...stakeholders, '']);
  };

  const updateStakeholder = (index: number, value: string) => {
    setStakeholders(stakeholders.map((stakeholder, i) => i === index ? value : stakeholder));
  };

  const removeStakeholder = (index: number) => {
    if (stakeholders.length > 1) {
      setStakeholders(stakeholders.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dilemma: EthicalDilemma = {
      id: crypto.randomUUID(),
      title: title.trim(),
      scenario: scenario.trim(),
      context: context.trim() || undefined,
      options: options.filter(option => option.title.trim() && option.description.trim()),
      stakeholders: stakeholders.filter(stakeholder => stakeholder.trim()),
      createdAt: new Date()
    };

    onAnalyze(dilemma);
  };

  const isFormValid = title.trim() && scenario.trim() && 
    options.filter(option => option.title.trim() && option.description.trim()).length >= 2 &&
    stakeholders.filter(stakeholder => stakeholder.trim()).length >= 1;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Build Your Ethical Dilemma</h2>
          <p className="text-purple-100 mt-1">Describe your scenario for comprehensive ethical analysis</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Healthcare Resource Allocation"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scenario Description *
              </label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Describe the ethical dilemma in detail. What is the situation? What makes this decision difficult?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Context
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Any additional background information, constraints, or relevant details"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Decision Options * (Minimum 2)
              </label>
              <button
                type="button"
                onClick={addOption}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>

            <div className="space-y-4">
              {options.map((option, optionIndex) => (
                <div key={option.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Option {optionIndex + 1}</h4>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(option.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={option.title}
                      onChange={(e) => updateOption(option.id, 'title', e.target.value)}
                      placeholder="Option title"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />

                    <textarea
                      value={option.description}
                      onChange={(e) => updateOption(option.id, 'description', e.target.value)}
                      placeholder="Detailed description of this option"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
                    />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Consequences</label>
                        <button
                          type="button"
                          onClick={() => addConsequence(option.id)}
                          className="text-sm text-purple-600 hover:text-purple-700"
                        >
                          Add Consequence
                        </button>
                      </div>
                      
                      {option.consequences.map((consequence, consIndex) => (
                        <div key={consIndex} className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            value={consequence}
                            onChange={(e) => updateConsequence(option.id, consIndex, e.target.value)}
                            placeholder="Potential consequence"
                            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          {option.consequences.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeConsequence(option.id, consIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Stakeholders * (Who is affected?)</span>
                </div>
              </label>
              <button
                type="button"
                onClick={addStakeholder}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Stakeholder</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stakeholders.map((stakeholder, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={stakeholder}
                    onChange={(e) => updateStakeholder(index, e.target.value)}
                    placeholder="e.g., Patients, Healthcare workers, Taxpayers"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {stakeholders.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStakeholder(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>All required fields must be completed</span>
              </div>
              
              <button
                type="submit"
                disabled={!isFormValid}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Analyze Dilemma
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}