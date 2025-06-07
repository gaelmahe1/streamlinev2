import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { QuickActions } from '../components/dashboard/QuickActions';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuthStore } from '../store/authStore';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bon retour, {user?.username} ! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Voici ce qui se passe avec vos streams aujourd'hui.
        </p>
      </div>
      
      <StatsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickActions />
        
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progression Actuelle</h2>
          <div className="space-y-4">
            <ProgressBar
              label="Progression Niveau 12"
              value={850}
              max={1000}
              variant="gold"
              size="lg"
            />
            <div className="text-sm text-gray-600">
              <p>150 XP nécessaires pour atteindre le Niveau 13</p>
              <p className="text-yellow-600 font-medium">Récompense : Pack d'Overlay Premium</p>
            </div>
            
            <hr className="my-4" />
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Succès Récents</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Maître du Temps de Fonctionnement - il y a 7 jours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Créateur d'Overlay - il y a 2 semaines</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Premier Stream - il y a 1 mois</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};