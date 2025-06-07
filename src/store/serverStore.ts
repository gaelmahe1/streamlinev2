import { create } from 'zustand';
import { MinecraftServer, ConceptEgg } from '../types';

interface ServerState {
  servers: MinecraftServer[];
  selectedServer: MinecraftServer | null;
  conceptEggs: ConceptEgg[];
  isLoading: boolean;
  addServer: (server: MinecraftServer) => void;
  updateServer: (serverId: string, updates: Partial<MinecraftServer>) => void;
  removeServer: (serverId: string) => void;
  setSelectedServer: (server: MinecraftServer | null) => void;
  setServers: (servers: MinecraftServer[]) => void;
  setConceptEggs: (eggs: ConceptEgg[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useServerStore = create<ServerState>((set) => ({
  servers: [],
  selectedServer: null,
  conceptEggs: [
    {
      id: 'tnt',
      name: 'Guerres TNT',
      description: 'Batailles PvP explosives avec des canons TNT',
      icon: '💣',
      dockerImage: 'streamline/minecraft-tnt:latest'
    },
    {
      id: 'oneblock',
      name: 'One Block',
      description: 'Survivez et développez à partir d\'un seul bloc',
      icon: '🧱',
      dockerImage: 'streamline/minecraft-oneblock:latest'
    },
    {
      id: 'skyblock',
      name: 'Sky Block',
      description: 'Construisez votre île dans le ciel',
      icon: '☁️',
      dockerImage: 'streamline/minecraft-skyblock:latest'
    },
    {
      id: 'uhc',
      name: 'Ultra Hardcore',
      description: 'Survie PvP sans régénération naturelle',
      icon: '⚔️',
      dockerImage: 'streamline/minecraft-uhc:latest'
    }
  ],
  isLoading: false,
  addServer: (server) => set((state) => ({ servers: [...state.servers, server] })),
  updateServer: (serverId, updates) => set((state) => ({
    servers: state.servers.map(s => s.id === serverId ? { ...s, ...updates } : s)
  })),
  removeServer: (serverId) => set((state) => ({
    servers: state.servers.filter(s => s.id !== serverId)
  })),
  setSelectedServer: (server) => set({ selectedServer: server }),
  setServers: (servers) => set({ servers }),
  setConceptEggs: (eggs) => set({ conceptEggs: eggs }),
  setLoading: (loading) => set({ isLoading: loading }),
}));