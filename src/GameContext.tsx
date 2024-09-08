import type { Action, GameState, Player } from "./types";
import React, { createContext, useContext, useReducer } from "react";
import { Chess } from "chess.js";

import reducer from "./GameReducer";

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
  isGameOver: false,
  isDraw: false,
};

export const GameContextProvider = ({ children }: GameContextProviderType) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
