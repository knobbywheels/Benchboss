export type Position = 'F' | 'D' | 'G';

export interface Player {
  id: string;
  name: string;
  number: string;
  position: Position;
  onIce: boolean;
  toi: number; // in seconds
  stats: {
    shots: number;
    blockedShots: number;
    takeaways: number;
    completedPasses: number;
    goals: number;
    assists: number;
    saves: number; // for goalies
  };
}

export interface Shot {
  id: string;
  playerId: string;
  x: number; // 0-100 (percentage of rink width)
  y: number; // 0-100 (percentage of rink height)
  timestamp: number;
  period: number;
  isGoal: boolean;
}

export interface Game {
  id: string;
  opponent: string;
  location: string;
  periodLength: number; // in minutes
  currentPeriod: number;
  clockTime: number; // in seconds remaining
  isClockRunning: boolean;
  startTime: number | null;
  players: Player[];
  shots: Shot[];
  createdAt: number;
}
