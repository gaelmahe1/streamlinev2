import { create } from 'zustand';
import { OverlayTemplate, OverlayElement } from '../types';

interface OverlayState {
  templates: OverlayTemplate[];
  selectedTemplate: OverlayTemplate | null;
  isEditing: boolean;
  addTemplate: (template: OverlayTemplate) => void;
  updateTemplate: (templateId: string, updates: Partial<OverlayTemplate>) => void;
  removeTemplate: (templateId: string) => void;
  setSelectedTemplate: (template: OverlayTemplate | null) => void;
  setTemplates: (templates: OverlayTemplate[]) => void;
  setEditing: (editing: boolean) => void;
  addElement: (templateId: string, element: OverlayElement) => void;
  updateElement: (templateId: string, elementId: string, updates: Partial<OverlayElement>) => void;
  removeElement: (templateId: string, elementId: string) => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  templates: [],
  selectedTemplate: null,
  isEditing: false,
  addTemplate: (template) => set((state) => ({ templates: [...state.templates, template] })),
  updateTemplate: (templateId, updates) => set((state) => ({
    templates: state.templates.map(t => t.id === templateId ? { ...t, ...updates } : t)
  })),
  removeTemplate: (templateId) => set((state) => ({
    templates: state.templates.filter(t => t.id !== templateId)
  })),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setTemplates: (templates) => set({ templates }),
  setEditing: (editing) => set({ isEditing: editing }),
  addElement: (templateId, element) => set((state) => ({
    templates: state.templates.map(t => 
      t.id === templateId 
        ? { ...t, elements: [...t.elements, element] }
        : t
    )
  })),
  updateElement: (templateId, elementId, updates) => set((state) => ({
    templates: state.templates.map(t => 
      t.id === templateId 
        ? { 
            ...t, 
            elements: t.elements.map(e => e.id === elementId ? { ...e, ...updates } : e)
          }
        : t
    )
  })),
  removeElement: (templateId, elementId) => set((state) => ({
    templates: state.templates.map(t => 
      t.id === templateId 
        ? { ...t, elements: t.elements.filter(e => e.id !== elementId) }
        : t
    )
  })),
}));