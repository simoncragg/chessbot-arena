import type { AppState } from "../types";

const LOCAL_STORAGE_KEY = "chessbot-arena-store-v1";

export function load(initialState: AppState): AppState {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : initialState;
}
  
export function save(state: AppState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};
