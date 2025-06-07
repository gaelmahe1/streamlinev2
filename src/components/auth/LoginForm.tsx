import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Crown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSwitchToDiscord: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToDiscord }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin login
      if (data.email === 'admin@streamlineagency.eu' && data.password === 'admin123') {
        login({
          id: 'admin-1',
          username: 'Administrateur',
          email: data.email,
          role: 'admin'
        });
        toast.success('Bon retour, Administrateur !');
      } else {
        toast.error('Email ou mot de passe invalide');
      }
    } catch (error) {
      toast.error('Échec de la connexion. Veuillez réessayer.');
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
          <p className="text-gray-600 mt-2">Connexion Administrateur</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="admin@streamlineagency.eu"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de Passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                {...register('password', { 
                  required: 'Le mot de passe est requis',
                  minLength: {
                    value: 6,
                    message: 'Le mot de passe doit contenir au moins 6 caractères'
                  }
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Entrez votre mot de passe"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            className="w-full"
          >
            Se Connecter
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous êtes créateur ?{' '}
            <button
              onClick={onSwitchToDiscord}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Se connecter avec Discord
            </button>
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Démo :</strong> Utilisez admin@streamlineagency.eu / admin123
          </p>
        </div>
      </Card>
    </div>
  );
};