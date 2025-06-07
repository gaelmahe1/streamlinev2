import React from 'react';
import { User, Bell, Shield, Palette, Server } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

export const Settings: React.FC = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">
          Gérez votre compte et vos préférences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Informations du Profil</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    value={user?.username || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <input
                    type="text"
                    value={user?.role === 'creator' ? 'créateur' : 'administrateur'}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                  />
                </div>
              </div>
              
              {user?.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              )}
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Statut du Serveur</p>
                  <p className="text-sm text-gray-600">Être notifié quand les serveurs se connectent/déconnectent</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Succès Débloqué</p>
                  <p className="text-sm text-gray-600">Célébrer quand vous terminez des jalons</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Résumé Hebdomadaire</p>
                  <p className="text-sm text-gray-600">Rapport hebdomadaire de progression et statistiques</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Apparence</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thème
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option>Clair (Par défaut)</option>
                  <option>Sombre</option>
                  <option>Automatique</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur d'Accent
                </label>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-yellow-600"></button>
                  <button className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-300"></button>
                  <button className="w-8 h-8 bg-green-500 rounded-full border-2 border-gray-300"></button>
                  <button className="w-8 h-8 bg-purple-500 rounded-full border-2 border-gray-300"></button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Sécurité</h3>
            </div>
            
            <div className="space-y-3">
              {user?.role === 'creator' && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Discord Connecté</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Rôle Streamer Vérifié</p>
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full">
                Changer le Mot de Passe
              </Button>
              
              <Button variant="outline" size="sm" className="w-full">
                Authentification à Deux Facteurs
              </Button>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Server className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Préférences Serveur</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Région Serveur par Défaut
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option>Europe (Par défaut)</option>
                  <option>Amérique du Nord</option>
                  <option>Asie Pacifique</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Démarrage Auto des Serveurs
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option>Manuel</option>
                  <option>À la Connexion</option>
                  <option>Programmé</option>
                </select>
              </div>
            </div>
          </Card>
          
          <div className="text-center">
            <Button variant="primary" size="lg" className="w-full">
              Sauvegarder les Modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};