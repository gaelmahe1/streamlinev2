import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ConceptSelector } from '../components/servers/ConceptSelector';
import { ServerCard } from '../components/servers/ServerCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useServerStore } from '../store/serverStore';
import { ConceptEgg, MinecraftServer } from '../types';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const Servers: React.FC = () => {
  const [showCreator, setShowCreator] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<ConceptEgg | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const { servers, addServer, updateServer, removeServer } = useServerStore();
  const { user } = useAuthStore();
  
  const handleDeploy = async () => {
    if (!selectedConcept || !user) return;
    
    setIsDeploying(true);
    try {
      // Simulate server deployment
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newServer: MinecraftServer = {
        id: `server-${Date.now()}`,
        name: `MC N2 (${user.username})`,
        concept: selectedConcept,
        status: 'online',
        ip: '192.168.1.100',
        port: 25565 + servers.length,
        tikfinityPort: 8080 + servers.length,
        password: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        owner: user.id
      };
      
      addServer(newServer);
      setShowCreator(false);
      setSelectedConcept(null);
      toast.success('Serveur déployé avec succès !');
    } catch (error) {
      toast.error('Échec du déploiement du serveur. Veuillez réessayer.');
    } finally {
      setIsDeploying(false);
    }
  };
  
  const handleServerAction = async (serverId: string, action: string) => {
    const server = servers.find(s => s.id === serverId);
    if (!server) return;
    
    switch (action) {
      case 'start':
        updateServer(serverId, { status: 'starting' });
        setTimeout(() => updateServer(serverId, { status: 'online' }), 2000);
        toast.success('Serveur en cours de démarrage...');
        break;
      case 'stop':
        updateServer(serverId, { status: 'stopping' });
        setTimeout(() => updateServer(serverId, { status: 'offline' }), 2000);
        toast.success('Serveur en cours d\'arrêt...');
        break;
      case 'restart':
        updateServer(serverId, { status: 'stopping' });
        setTimeout(() => {
          updateServer(serverId, { status: 'starting' });
          setTimeout(() => updateServer(serverId, { status: 'online' }), 2000);
        }, 1000);
        toast.success('Serveur en cours de redémarrage...');
        break;
      case 'delete':
        removeServer(serverId);
        toast.success('Serveur supprimé avec succès');
        break;
    }
  };
  
  const activeServersCount = servers.filter(s => s.status === 'online').length;
  const canCreateServer = servers.length === 0; // One server limit
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Serveurs Minecraft</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos déploiements de serveurs Minecraft
          </p>
        </div>
        
        {canCreateServer && !showCreator && (
          <Button
            onClick={() => setShowCreator(true)}
            icon={Plus}
            size="lg"
          >
            Créer un Nouveau Serveur
          </Button>
        )}
      </div>
      
      {!canCreateServer && !showCreator && (
        <Card>
          <div className="text-center py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Limite de Serveur Atteinte</h3>
            <p className="text-gray-600">
              Vous ne pouvez avoir qu'un seul serveur actif à la fois pour éviter la saturation de la machine.
              Supprimez votre serveur actuel pour en créer un nouveau.
            </p>
          </div>
        </Card>
      )}
      
      {showCreator && (
        <ConceptSelector
          selectedConcept={selectedConcept}
          onSelect={setSelectedConcept}
          onDeploy={handleDeploy}
          isDeploying={isDeploying}
        />
      )}
      
      {servers.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Vos Serveurs</h2>
            <div className="text-sm text-gray-600">
              {activeServersCount} sur {servers.length} serveurs en ligne
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {servers.map((server) => (
              <ServerCard
                key={server.id}
                server={server}
                onStart={() => handleServerAction(server.id, 'start')}
                onStop={() => handleServerAction(server.id, 'stop')}
                onRestart={() => handleServerAction(server.id, 'restart')}
                onDelete={() => handleServerAction(server.id, 'delete')}
              />
            ))}
          </div>
        </div>
      )}
      
      {servers.length === 0 && !showCreator && (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun Serveur Pour le Moment</h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre premier serveur Minecraft avec un concept pré-configuré.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};