import type { Action, GameState, Player } from "./types";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Chess } from "chess.js";
import reducer from "./GameReducer";

const LOCAL_STORAGE_KEY = "chessbot-arena-store-v1";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<Action>;
};

type GameContextProviderType = {
  children: React.ReactNode;
}

const GameContext = createContext({} as GameContextType);

const white: Player = { colour: "White", playerType: "Bot", name: "" };
const black: Player = { colour: "Black", playerType: "Bot", name: "" };

const initialState: GameState = {
  white,
  black,
  fen: new Chess().fen(),
  moveHistory: [],
  activePlayer: white,
  whiteCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
  blackCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
  isGameOver: false,
  isDraw: false,
  chessBots: [],
  boardOrientation: "white"
};

const loadStateFromLocalStorage = (initialState: GameState): GameState => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : initialState;
};

export const GameContextProvider = ({ children }: GameContextProviderType) => {
  
  const [state, dispatch] = useReducer(reducer, {}, () => loadStateFromLocalStorage(initialState));

  useEffect(() => {
    const handlePageUnload = () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    window.addEventListener("beforeunload", handlePageUnload);

    return () => {
      window.removeEventListener("beforeunload", handlePageUnload);
    };
  }, [state]);

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
