import type { Action, GameState } from "./types";

import React, { createContext, useContext, useReducer } from "react";
import reducer from "./GameReducer";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<Action>;
};

type GameContextProviderType = {
  children: React.ReactNode;
}

const GameContext = createContext({} as GameContextType);

const initialState: GameState = {
  whiteBot:  { colour: "White" },
  blackBot: { colour: "Black" },
  fen: undefined,
  activePlayer: undefined,
  isGameOver: false
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
