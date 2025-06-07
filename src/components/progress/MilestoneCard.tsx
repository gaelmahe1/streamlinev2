import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Milestone } from '../../types';

interface MilestoneCardProps {
  milestone: Milestone;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  const progress = (milestone.currentValue / milestone.targetValue) * 100;
  
  const getIcon = () => {
    if (milestone.completed) return Trophy;
    if (progress >= 50) return Star;
    return Target;
  };
  
  const Icon = getIcon();
  
  return (
    <Card hover className={`${milestone.completed ? 'bg-yellow-50 border-yellow-200' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className={`
          p-3 rounded-lg
          ${milestone.completed 
            ? 'bg-yellow-500 text-white' 
            : 'bg-gray-100 text-gray-600'
          }
        `}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
            {milestone.completed && (
              <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                Terminé
              </span>
            )}
          </div>
          
          <div className="mb-3">
            <ProgressBar
              value={milestone.currentValue}
              max={milestone.targetValue}
              variant="gold"
              size="md"
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-600">
                {milestone.currentValue} / {milestone.targetValue}
              </span>
              <span className="text-sm font-medium text-yellow-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Récompense :</span>
              <span className="text-sm text-gray-600">{milestone.reward}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};