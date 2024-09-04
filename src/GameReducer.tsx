import type { Action, GameState } from "./types";
import { Chess } from "chess.js";

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "SET_WHITE_BOT":
      return { ...state, whiteBot: action.payload };
    case "SET_BLACK_BOT":
      return { ...state, blackBot: action.payload };
    case "INIT_GAME":
      return initGame(state);
    case "MAKE_MOVE":
      return makeMove(state, action.payload);
    default:
      return state;
  }
};

function initGame(state: GameState) {
  const chess = new Chess();
  return { 
    ...state, 
    fen: chess.fen(),
    moveHistory: [],
    activePlayer: state.whiteBot,
    isGameOver: false,
    isDraw: false,
  };
}

function makeMove(state: GameState, move: string) {
  const chess = initChessObject(state.moveHistory);
  chess.move(move);
  console.log(`${state.activePlayer!.colour} move: ${move}`);

  return { 
    ...state,
    fen: chess.fen(),
    moveHistory: [... state.moveHistory, move],
    activePlayer: getNextTurn(chess, state),
    isGameOver: chess.isGameOver(),
    isDraw: chess.isDraw(),
  };
}

function initChessObject(moveHistory: string[]): Chess {
  const chess = new Chess();
  moveHistory.forEach(move => chess.move(move));
  return chess;
}

function getNextTurn(chess: Chess, state: GameState) {
  const { activePlayer, whiteBot, blackBot } = state;
  return chess.isGameOver() 
    ? activePlayer
    : activePlayer?.colour === "White" ? blackBot : whiteBot;
}

export default reducer;
