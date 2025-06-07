import React, { useState } from 'react';
import { MessageSquare, Crown, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface DiscordLoginProps {
  onSwitchToAdmin: () => void;
}

export const DiscordLogin: React.FC<DiscordLoginProps> = ({ onSwitchToAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  
  const handleDiscordLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Discord OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful Discord login with role verification
      const mockUser = {
        id: 'discord-123',
        username: 'StreamerPro',
        email: 'streamer@example.com',
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        role: 'creator' as const,
        discordId: '123456789',
        hasStreamerRole: true,
        isInGuild: true
      };
      
      login(mockUser);
      toast.success('Connexion Discord réussie !');
    } catch (error) {
      toast.error('Échec de la connexion Discord. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Streamline Agency</h1>
          <p className="text-gray-600 mt-2">Accès Créateur</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Prérequis pour l'accès :</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Compte Discord requis</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Membre du Discord Streamline Agency</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Vérification du rôle "Streamer"</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleDiscordLogin}
            variant="primary"
            size="lg"
            loading={isLoading}
            icon={MessageSquare}
            className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          >
            {isLoading ? 'Vérification de l\'accès...' : 'Se connecter avec Discord'}
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous êtes administrateur ?{' '}
            <button
              onClick={onSwitchToAdmin}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Connexion Admin
            </button>
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Démo :</strong> Cliquez sur connexion Discord pour simuler une authentification réussie
          </p>
        </div>
      </Card>
    </div>
  );
};