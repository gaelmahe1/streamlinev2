import React, { useRef, useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { OverlayTemplate, OverlayElement } from '../../types';
import { useOverlayStore } from '../../store/overlayStore';

interface OverlayCanvasProps {
  template: OverlayTemplate;
  isEditing: boolean;
}

export const OverlayCanvas: React.FC<OverlayCanvasProps> = ({ template, isEditing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedElement, setSelectedElement] = useState<OverlayElement | null>(null);
  const { updateElement } = useOverlayStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid if editing
    if (isEditing) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
    
    // Draw elements
    template.elements.forEach((element) => {
      if (element.type === 'text') {
        ctx.fillStyle = element.color || '#000000';
        ctx.font = `${element.fontSize || 16}px ${element.fontFamily || 'Arial'}`;
        ctx.fillText(element.content, element.x, element.y);
      }
      
      // Draw selection border if editing and selected
      if (isEditing && selectedElement?.id === element.id) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(element.x - 2, element.y - element.height - 2, element.width + 4, element.height + 4);
      }
    });
  }, [template, isEditing, selectedElement]);
  
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEditing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Find clicked element
    const clickedElement = template.elements.find(element => 
      x >= element.x && x <= element.x + element.width &&
      y >= element.y - element.height && y <= element.y
    );
    
    setSelectedElement(clickedElement || null);
  };
  
  return (
    <Card padding="sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Aperçu du Canevas</h3>
          <div className="text-sm text-gray-500">
            {template.gameType.toUpperCase()} - {template.type === 'win' ? 'VICTOIRE' : 'ACTION'}
          </div>
        </div>
        
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full cursor-crosshair"
            onClick={handleCanvasClick}
          />
        </div>
        
        {selectedElement && isEditing && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Élément Sélectionné</h4>
            <div className="space-y-2 text-sm">
              <div>
                <label className="block text-yellow-700">Contenu :</label>
                <input
                  type="text"
                  value={selectedElement.content}
                  onChange={(e) => updateElement(template.id, selectedElement.id, { content: e.target.value })}
                  className="w-full px-2 py-1 border border-yellow-300 rounded text-gray-900"
                />
              </div>
              {selectedElement.type === 'text' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-yellow-700">Taille de Police :</label>
                    <input
                      type="number"
                      value={selectedElement.fontSize || 16}
                      onChange={(e) => updateElement(template.id, selectedElement.id, { fontSize: parseInt(e.target.value) })}
                      className="w-full px-2 py-1 border border-yellow-300 rounded text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-700">Couleur :</label>
                    <input
                      type="color"
                      value={selectedElement.color || '#000000'}
                      onChange={(e) => updateElement(template.id, selectedElement.id, { color: e.target.value })}
                      className="w-full h-8 border border-yellow-300 rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};