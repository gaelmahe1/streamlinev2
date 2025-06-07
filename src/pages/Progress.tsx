import React from 'react';
import { Trophy, Star, Target, Crown } from 'lucide-react';
import { MilestoneCard } from '../components/progress/MilestoneCard';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Milestone } from '../types';

export const Progress: React.FC = () => {
  const currentLevel = 12;
  const currentXP = 850;
  const nextLevelXP = 1000;
  
  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Premier Stream',
      description: 'Terminer votre première session de streaming',
      targetValue: 1,
      currentValue: 1,
      reward: 'Pack d\'Overlay Basique',
      completed: true,
      completedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Maître des Serveurs',
      description: 'Maintenir un serveur en marche pendant 24 heures',
      targetValue: 24,
      currentValue: 18,
      reward: 'Nom de Serveur Personnalisé',
      completed: false
    },
    {
      id: '3',
      title: 'Créateur d\'Overlay',
      description: 'Créer 5 modèles d\'overlay personnalisés',
      targetValue: 5,
      currentValue: 3,
      reward: 'Pack Graphique Premium',
      completed: false
    },
    {
      id: '4',
      title: 'Bâtisseur de Communauté',
      description: 'Atteindre 100 membres Discord',
      targetValue: 100,
      currentValue: 67,
      reward: 'Badge Exclusif',
      completed: false
    },
    {
      id: '5',
      title: 'Vétéran du Stream',
      description: 'Terminer 50 sessions de streaming',
      targetValue: 50,
      currentValue: 12,
      reward: 'Statut VIP',
      completed: false
    }
  ];
  
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progression & Succès</h1>
        <p className="text-gray-600 mt-1">
          Suivez votre parcours de streaming et débloquez des récompenses
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Niveau {currentLevel}</h2>
              <p className="text-gray-600">Créateur Aspirant</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <ProgressBar
              label={`Progression vers le Niveau ${currentLevel + 1}`}
              value={currentXP}
              max={nextLevelXP}
              variant="gold"
              size="lg"
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{currentXP} / {nextLevelXP} XP</span>
              <span className="text-yellow-600 font-medium">
                {nextLevelXP - currentXP} XP pour le niveau suivant
              </span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Récompense du Niveau Suivant</h3>
            <p className="text-yellow-700">Pack d'Overlay Premium + Emotes Personnalisées</p>
          </div>
        </Card>
        
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Résumé des Succès</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">Terminés</span>
              </div>
              <span className="font-semibold text-gray-900">
                {completedMilestones} / {totalMilestones}
              </span>
            </div>
            
            <ProgressBar
              value={completedMilestones}
              max={totalMilestones}
              variant="gold"
              size="sm"
            />
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600">Série actuelle : 7 jours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">Objectifs ce mois : 3/5</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Jalons</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </div>
  );
};