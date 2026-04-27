// ============================================
// Core Types for Hisab - Points Calculator
// ============================================

export interface Player {
  id: string;
  name: string;
  avatar: string; // initials or emoji
  color: string;
  isOnline?: boolean;
  email?: string;
}

export interface Fine {
  id: string;
  playerId: string;
  roundNumber: number;
  amount: number;
  reason: string;
  createdAt: string;
}

export interface RoundScore {
  playerId: string;
  score: number;
  fines: Fine[];
}

export interface Round {
  id: string;
  roundNumber: number;
  scores: RoundScore[];
  timestamp: string;
  isCompleted: boolean;
  notes?: string;
}

export interface GameSession {
  id: string;
  name: string;
  gameType: GameType;
  players: Player[];
  rounds: Round[];
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
  maxRounds?: number;
  groupId?: string;
}

export type GameType = 'cards' | 'dice' | 'board' | 'custom';

export interface PlayerGroup {
  id: string;
  name: string;
  description: string;
  members: Player[];
  createdAt: string;
  gamesPlayed: number;
  color: string;
}

export interface Notification {
  id: string;
  type: 'score_update' | 'fine_imposed' | 'game_invite' | 'game_completed' | 'round_completed';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  gameId?: string;
  playerId?: string;
}

export interface LeaderboardEntry {
  player: Player;
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  avgScore: number;
  totalFines: number;
}

export interface DashboardStats {
  activeGames: number;
  totalPlayers: number;
  totalGroups: number;
  gamesThisWeek: number;
}
