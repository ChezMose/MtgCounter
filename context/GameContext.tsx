import React, { createContext, useCallback, useContext, useReducer, useRef } from 'react';
import { GameState, HistoryEntry } from '../types/game';

const DEFAULT_STARTING_LIFE = 20;
const THROTTLE_DELAY_MS = 3000;

type Action =
  | { type: 'CHANGE_LIFE'; player: 1 | 2; delta: number }
  | { type: 'COMMIT_ENTRY'; entry: HistoryEntry }
  | { type: 'NEW_GAME'; startingLife: number };

function makeInitial(startingLife: number): GameState {
  return {
    startingLife,
    startTime: Date.now(),
    p1Life: startingLife,
    p2Life: startingLife,
    history: [{ timestamp: 0, p1Life: startingLife, p2Life: startingLife }],
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'CHANGE_LIFE':
      return {
        ...state,
        p1Life: action.player === 1 ? state.p1Life + action.delta : state.p1Life,
        p2Life: action.player === 2 ? state.p2Life + action.delta : state.p2Life,
      };
    case 'COMMIT_ENTRY':
      return { ...state, history: [...state.history, action.entry] };
    case 'NEW_GAME':
      return makeInitial(action.startingLife);
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  changeLife: (player: 1 | 2, delta: number) => void;
  newGame: (startingLife: number) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STARTING_LIFE, makeInitial);

  // Stable ref so timer callbacks always read the latest state without
  // needing state in their dependency arrays.
  const stateRef = useRef(state);
  stateRef.current = state;

  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commitEntry = useCallback(() => {
    const s = stateRef.current;
    const last = s.history[s.history.length - 1];
    if (last && last.p1Life === s.p1Life && last.p2Life === s.p2Life) return;
    dispatch({
      type: 'COMMIT_ENTRY',
      entry: {
        timestamp: Date.now() - s.startTime,
        p1Life: s.p1Life,
        p2Life: s.p2Life,
      },
    });
  }, []);

  const changeLife = useCallback(
    (player: 1 | 2, delta: number) => {
      dispatch({ type: 'CHANGE_LIFE', player, delta });
      if (throttleTimer.current) clearTimeout(throttleTimer.current);
      throttleTimer.current = setTimeout(commitEntry, THROTTLE_DELAY_MS);
    },
    [commitEntry],
  );

  const newGame = useCallback((startingLife: number) => {
    if (throttleTimer.current) { clearTimeout(throttleTimer.current); throttleTimer.current = null; }
    dispatch({ type: 'NEW_GAME', startingLife });
  }, []);

  return (
    <GameContext.Provider value={{ state, changeLife, newGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
