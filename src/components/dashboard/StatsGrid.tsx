import React from 'react';
import { Server, Palette, TrendingUp, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { useServerStore } from '../../store/serverStore';
import { useOverlayStore } from '../../store/overlayStore';

export const StatsGrid: React.FC = () => {
  const { servers } = useServerStore();
  const { templates } = useOverlayStore();
  
  const activeServers = servers.filter(s => s.status === 'online').length;
  
  const stats = [
    {
      name: 'Serveurs Actifs',
      value: activeServers,
      total: servers.length,
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Modèles d\'Overlay',
      value: templates.length,
      total: null,
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Niveau Actuel',
      value: 12,
      total: null,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Succès',
      value: 8,
      total: 15,
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                {stat.total && (
                  <span className="ml-1 text-sm text-gray-500">/ {stat.total}</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};