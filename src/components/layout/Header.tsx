import React from 'react';
import { Crown, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Streamline Agency</h1>
                <p className="text-xs text-gray-500">Tableau de Bord Créateur</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700">{user.username}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role === 'creator' ? 'créateur' : 'administrateur'}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={LogOut}
                  onClick={logout}
                >
                  Déconnexion
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};