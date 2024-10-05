import type { Action, GameState, Player } from "./types";

import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { Chess } from "chess.js";

import reducer from "./GameReducer";
import * as stateStore from "./services/stateStore";

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

export const GameContextProvider = ({ children }: GameContextProviderType) => {
  
  const [state, dispatch] = useReducer(reducer, {}, () => stateStore.load(initialState));
  const lastFenRef = useRef(state.fen);

  useEffect(() => {
    if (state.fen !== lastFenRef.current) {
      stateStore.save(state);
      lastFenRef.current = state.fen;
    }
  }, [state]);

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
