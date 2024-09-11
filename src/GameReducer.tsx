import type { Action, ChessBot, GameState, Player } from "./types";
import { Chess } from "chess.js";

const reducer = (state: GameState, action: Action): GameState => {
  
  switch (action.type) {

    case "SET_CHESSBOTS":
      return setChessBots(state, action.payload);

    case "SET_WHITE":
      return setWhite(state, action.payload);

    case "SET_BLACK":
      return setBlack(state, action.payload);

    case "START_GAME":
      return startGame(state);

    case "MAKE_MOVE":
      return makeMove(state, action.payload);

    default:
      return state;
  }
};

function setChessBots(state: GameState, payload: ChessBot[]) {
  return { ...state, chessBots: payload };
}

function setWhite(state: GameState, payload: Player) {
  return { ...state, white: payload };
}

function setBlack(state: GameState, payload: Player) {
  return { ...state, black: payload };
}

function startGame(state: GameState) {
  const chess = new Chess();

  return { 
    ...state,
    fen: chess.fen(),
    moveHistory: [],
    activePlayer: { ...state.white },
    isGameOver: false,
    isDraw: false,
  };
}

function makeMove(state: GameState, move: string) {

  const chess = initChessObject(state.moveHistory);
  console.log(`${state.activePlayer.colour} move: ${move}`);
  try {
    chess.move(move);
  }
  catch (err: unknown) {
    console.log(err, {state});
  }

  return { 
    ...state,
    fen: chess.fen(),
    moveHistory: [... state.moveHistory, move],
    activePlayer: getActivePlayer(chess, state),
    isGameOver: chess.isGameOver(),
    isDraw: chess.isDraw(),
  };
}

function initChessObject(moveHistory: string[]): Chess {
  const chess = new Chess();
  moveHistory.forEach(move => chess.move(move));
  return chess;
}

function getActivePlayer(chess: Chess, state: GameState) {
  const { white, black } = state;
  return chess.turn() === "w"
    ? { ...white }
    : { ...black };
}

export default reducer;
