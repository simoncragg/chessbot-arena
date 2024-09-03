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
  return { ...state, fen: chess.fen(), activePlayer: state.whiteBot };
}

function makeMove(state: GameState, moveSan: string) {
  const { fen } = state;
  const chess = new Chess(fen);
  chess.move(moveSan);

  return { 
    ...state, 
    fen: chess.fen(), 
    activePlayer: getNextTurn(chess, state),
    isGameOver: chess.isGameOver()
  };
}

function getNextTurn(chess: Chess, state: GameState) {
  const { activePlayer, whiteBot, blackBot } = state;
  return chess.isGameOver() 
    ? activePlayer
    : activePlayer?.colour === "White" ? blackBot : whiteBot;
}

export default reducer;
