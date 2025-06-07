import React from 'react';
import { Play, Square, RotateCcw, Copy, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MinecraftServer } from '../../types';
import toast from 'react-hot-toast';

interface ServerCardProps {
  server: MinecraftServer;
  onStart: () => void;
  onStop: () => void;
  onRestart: () => void;
  onDelete: () => void;
}

export const ServerCard: React.FC<ServerCardProps> = ({
  server,
  onStart,
  onStop,
  onRestart,
  onDelete
}) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copié dans le presse-papiers !`);
  };
  
  const getStatusColor = (status: MinecraftServer['status']) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'starting': return 'text-yellow-600 bg-yellow-100';
      case 'stopping': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusText = (status: MinecraftServer['status']) => {
    switch (status) {
      case 'online': return 'EN LIGNE';
      case 'offline': return 'HORS LIGNE';
      case 'starting': return 'DÉMARRAGE';
      case 'stopping': return 'ARRÊT';
      default: return status.toUpperCase();
    }
  };
  
  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{server.concept.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{server.name}</h3>
            <p className="text-sm text-gray-600">{server.concept.name}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(server.status)}`}>
          {getStatusText(server.status)}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">IP Minecraft :</span>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              {server.ip}:{server.port}
            </code>
            <button
              onClick={() => copyToClipboard(`${server.ip}:${server.port}`, 'IP Minecraft')}
              className="text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">TikFinity :</span>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              {server.ip}:{server.tikfinityPort}
            </code>
            <button
              onClick={() => copyToClipboard(`${server.ip}:${server.tikfinityPort}`, 'IP TikFinity')}
              className="text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Mot de passe :</span>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              {server.password}
            </code>
            <button
              onClick={() => copyToClipboard(server.password, 'Mot de passe')}
              className="text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {server.status === 'offline' && (
            <Button size="sm\" onClick={onStart} icon={Play}>
              Démarrer
            </Button>
          )}
          {server.status === 'online' && (
            <Button size="sm" variant="secondary" onClick={onStop} icon={Square}>
              Arrêter
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onRestart} icon={RotateCcw}>
            Redémarrer
          </Button>
        </div>
        <Button size="sm" variant="danger" onClick={onDelete} icon={Trash2}>
          Supprimer
        </Button>
      </div>
    </Card>
  );
};