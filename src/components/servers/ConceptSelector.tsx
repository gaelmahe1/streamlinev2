import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useServerStore } from '../../store/serverStore';
import { ConceptEgg } from '../../types';

interface ConceptSelectorProps {
  selectedConcept: ConceptEgg | null;
  onSelect: (concept: ConceptEgg) => void;
  onDeploy: () => void;
  isDeploying: boolean;
}

export const ConceptSelector: React.FC<ConceptSelectorProps> = ({
  selectedConcept,
  onSelect,
  onDeploy,
  isDeploying
}) => {
  const { conceptEggs } = useServerStore();
  
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Choisissez Votre Concept Minecraft</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conceptEggs.map((concept) => (
            <div
              key={concept.id}
              className={`
                p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${selectedConcept?.id === concept.id
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                }
              `}
              onClick={() => onSelect(concept)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{concept.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{concept.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{concept.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {selectedConcept && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Prêt à Déployer</h3>
              <p className="text-gray-600">
                Sélectionné : <span className="font-medium">{selectedConcept.name}</span>
              </p>
            </div>
            <Button
              onClick={onDeploy}
              loading={isDeploying}
              size="lg"
            >
              {isDeploying ? 'Déploiement du Serveur...' : 'Déployer le Serveur'}
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Configuration du Serveur :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Mémoire : 5000MB</li>
              <li>• Disque : 7000MB</li>
              <li>• Nœud : Nœud 2</li>
              <li>• Attribution automatique des ports</li>
              <li>• Intégration TikFinity activée</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};