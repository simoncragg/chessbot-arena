import type { GameState } from "../types";

const LOCAL_STORAGE_KEY = "chessbot-arena-store-v1";

export function load(initialState: GameState): GameState {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : initialState;
}
  
export function save(game: GameState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(game));
};
