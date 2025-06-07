import React from 'react';
import { Plus, Play, Palette, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: 'Créer un Nouveau Serveur',
      description: 'Déployer un nouveau serveur Minecraft avec votre concept choisi',
      icon: Plus,
      color: 'bg-blue-500',
      onClick: () => navigate('/servers')
    },
    {
      title: 'Démarrer Tous les Serveurs',
      description: 'Lancer tous vos serveurs Minecraft inactifs',
      icon: Play,
      color: 'bg-green-500',
      onClick: () => {
        // Mock action
        console.log('Démarrage de tous les serveurs...');
      }
    },
    {
      title: 'Modifier les Overlays',
      description: 'Personnaliser vos overlays de stream et modèles',
      icon: Palette,
      color: 'bg-purple-500',
      onClick: () => navigate('/overlays')
    },
    {
      title: 'Paramètres',
      description: 'Gérer votre compte et préférences',
      icon: Settings,
      color: 'bg-gray-500',
      onClick: () => navigate('/settings')
    }
  ];
  
  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="group p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 cursor-pointer"
            onClick={action.onClick}
          >
            <div className="flex items-start space-x-3">
              <div className={`${action.color} p-2 rounded-lg text-white`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-yellow-700">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};