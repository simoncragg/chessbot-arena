import type { GameState } from "../types";

const LOCAL_STORAGE_KEY = "chessbot-arena-store-v1";

export function loadStateFromLocalStorage(initialState: GameState): GameState {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : initialState;
}
  
export function saveStateToLocalStorage(state: GameState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};
