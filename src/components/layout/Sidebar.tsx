import React from 'react';
import { Home, Server, Palette, TrendingUp, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Tableau de Bord', href: '/', icon: Home },
  { name: 'Serveurs Minecraft', href: '/servers', icon: Server },
  { name: 'Éditeur d\'Overlay', href: '/overlays', icon: Palette },
  { name: 'Progression', href: '/progress', icon: TrendingUp },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <nav className="mt-8">
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`
                  w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive
                    ? 'bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                    isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};