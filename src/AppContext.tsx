import type { Action, AppState, Player } from "./types";

import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { Chess } from "chess.js";

import reducer from "./reducers/AppReducer";
import * as stateStore from "./services/stateStore";

type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

type AppContextProviderType = {
  children: React.ReactNode;
}

const AppContext = createContext({} as GameContextType);

const white: Player = { colour: "White", playerType: "Bot", name: "" };
const black: Player = { colour: "Black", playerType: "Bot", name: "" };

const initialState: AppState = {
  game: {
    isActive: false,
    white,
    black,
    fen: new Chess().fen(),
    moveHistory: [],
    activePlayer: white,
    whiteCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
    blackCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
    isGameOver: false,
    isDraw: false,
    boardOrientation: "white"
  },
  chessBots: []
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  
  const [state, dispatch] = useReducer(reducer, {}, () => ({
    ...initialState, 
    game: stateStore.load(initialState.game)
  }));

  const lastFenRef = useRef(state.game.fen);

  useEffect(() => {
    if (state.game.isActive && state.game.fen !== lastFenRef.current) {
      stateStore.save(state.game);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

export const useGame = () => {
  const { state, dispatch } = useApp();
  const { game } = state;

  return {
    game,
    dispatch
  };
}
