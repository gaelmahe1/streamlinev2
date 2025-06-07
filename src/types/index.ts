export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role: 'creator' | 'admin';
  discordId?: string;
  hasStreamerRole?: boolean;
  isInGuild?: boolean;
}

export interface MinecraftServer {
  id: string;
  name: string;
  concept: ConceptEgg;
  status: 'online' | 'offline' | 'starting' | 'stopping';
  ip: string;
  port: number;
  tikfinityPort: number;
  password: string;
  createdAt: string;
  owner: string;
}

export interface ConceptEgg {
  id: string;
  name: string;
  description: string;
  icon: string;
  dockerImage: string;
}

export interface OverlayTemplate {
  id: string;
  name: string;
  type: 'win' | 'action';
  gameType: 'gta' | 'fortnite' | 'minecraft';
  elements: OverlayElement[];
  canvasData: string;
}

export interface OverlayElement {
  id: string;
  type: 'text' | 'image' | 'icon';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export interface Progress {
  id: string;
  userId: string;
  milestones: Milestone[];
  currentLevel: number;
  totalPoints: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  reward: string;
  completed: boolean;
  completedAt?: string;
}