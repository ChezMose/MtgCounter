export interface HistoryEntry {
  timestamp: number;
  p1Life: number;
  p2Life: number;
}

export interface GameState {
  startingLife: number;
  startTime: number;
  p1Life: number;
  p2Life: number;
  history: HistoryEntry[];
}
