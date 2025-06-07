import React, { useState } from 'react';
import { Plus, Edit3, Eye, Palette } from 'lucide-react';
import { OverlayCanvas } from '../components/overlays/OverlayCanvas';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useOverlayStore } from '../store/overlayStore';
import { OverlayTemplate, OverlayElement } from '../types';
import toast from 'react-hot-toast';

export const Overlays: React.FC = () => {
  const { templates, selectedTemplate, isEditing, setSelectedTemplate, setEditing, addTemplate, addElement } = useOverlayStore();
  const [showCreator, setShowCreator] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'win' as 'win' | 'action',
    gameType: 'minecraft' as 'gta' | 'fortnite' | 'minecraft'
  });
  
  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim()) {
      toast.error('Veuillez entrer un nom de modèle');
      return;
    }
    
    const template: OverlayTemplate = {
      id: `template-${Date.now()}`,
      ...newTemplate,
      elements: [],
      canvasData: ''
    };
    
    addTemplate(template);
    setSelectedTemplate(template);
    setShowCreator(false);
    setNewTemplate({ name: '', type: 'win', gameType: 'minecraft' });
    toast.success('Modèle créé avec succès !');
  };
  
  const handleAddTextElement = () => {
    if (!selectedTemplate) return;
    
    const element: OverlayElement = {
      id: `element-${Date.now()}`,
      type: 'text',
      content: 'Nouveau Texte',
      x: 100,
      y: 100,
      width: 100,
      height: 20,
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000'
    };
    
    addElement(selectedTemplate.id, element);
    toast.success('Élément texte ajouté');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Éditeur d'Overlay</h1>
          <p className="text-gray-600 mt-1">
            Créez et personnalisez vos overlays de stream
          </p>
        </div>
        
        <Button
          onClick={() => setShowCreator(true)}
          icon={Plus}
          size="lg"
        >
          Nouveau Modèle
        </Button>
      </div>
      
      {showCreator && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Créer un Nouveau Modèle</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du Modèle
              </label>
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Entrez le nom du modèle..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'Overlay
                </label>
                <select
                  value={newTemplate.type}
                  onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as 'win' | 'action' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="win">Overlay de Victoire</option>
                  <option value="action">Overlay d'Action</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de Jeu
                </label>
                <select
                  value={newTemplate.gameType}
                  onChange={(e) => setNewTemplate({ ...newTemplate, gameType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="minecraft">Minecraft</option>
                  <option value="gta">GTA</option>
                  <option value="fortnite">Fortnite</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleCreateTemplate}>
                Créer le Modèle
              </Button>
              <Button variant="outline" onClick={() => setShowCreator(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Modèles</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-colors duration-200
                    ${selectedTemplate?.id === template.id
                      ? 'bg-yellow-100 border border-yellow-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{template.name}</p>
                      <p className="text-sm text-gray-600">
                        {template.gameType} • {template.type === 'win' ? 'victoire' : 'action'}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                          setEditing(true);
                        }}
                        className="p-1 text-gray-400 hover:text-yellow-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                          setEditing(false);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {templates.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aucun modèle pour le moment
                </p>
              )}
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          {selectedTemplate ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTemplate.name}
                </h3>
                <div className="flex space-x-2">
                  <Button
                    variant={isEditing ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setEditing(!isEditing)}
                    icon={isEditing ? Edit3 : Eye}
                  >
                    {isEditing ? 'Édition' : 'Aperçu'}
                  </Button>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={handleAddTextElement}
                    >
                      Ajouter du Texte
                    </Button>
                  )}
                </div>
              </div>
              
              <OverlayCanvas template={selectedTemplate} isEditing={isEditing} />
            </div>
          ) : (
            <Card>
              <div className="text-center py-12">
                <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun Modèle Sélectionné</h3>
                <p className="text-gray-600">
                  Sélectionnez un modèle dans la barre latérale ou créez-en un nouveau pour commencer.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};