import { EthicalFramework } from '../types/EthicalAnalysis';

export const ETHICAL_FRAMEWORKS: EthicalFramework[] = [
  {
    id: 'utilitarian',
    name: 'Utilitarian',
    description: 'Maximizes overall happiness and well-being for the greatest number of people',
    color: 'bg-blue-500',
    icon: 'Users'
  },
  {
    id: 'deontological',
    name: 'Deontological',
    description: 'Focuses on moral rules, duties, and rights regardless of consequences',
    color: 'bg-purple-500',
    icon: 'Scale'
  },
  {
    id: 'virtue',
    name: 'Virtue Ethics',
    description: 'Emphasizes character traits and moral virtues of the decision maker',
    color: 'bg-green-500',
    icon: 'Heart'
  },
  {
    id: 'care',
    name: 'Care Ethics',
    description: 'Prioritizes relationships, empathy, and care for individuals',
    color: 'bg-pink-500',
    icon: 'HandHeart'
  },
  {
    id: 'justice',
    name: 'Justice Ethics',
    description: 'Focuses on fairness, equality, and distribution of benefits and burdens',
    color: 'bg-orange-500',
    icon: 'Balance'
  }
];

export const getFrameworkByld = (id: string): EthicalFramework | undefined => {
  return ETHICAL_FRAMEWORKS.find(framework => framework.id === id);
};

export const getFrameworkColor = (frameworkId: string): string => {
  const framework = getFrameworkByld(frameworkId);
  return framework?.color || 'bg-gray-500';
};