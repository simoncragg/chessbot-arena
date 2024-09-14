import type { Action, ChessBot, DrawReasonType, GameState, Player } from "./types";
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
      //return gameOver(startGame(state));
      //return draw(startGame(state));

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

// function gameOver(state: GameState) {
//   return { 
//     ...state,
//     isGameOver: true,
//     activePlayer: state.white,
//   };
// }

// function draw(state: GameState) {
//   return { 
//     ...state,
//     isGameOver: true,
//     isDraw: true,
//     drawReason: "Stalemate",
//     activePlayer: state.white,
//   };
// }

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
    drawReason: mapToDrawReason(chess)
  };
}

function initChessObject(moveHistory: string[]): Chess {
  const chess = new Chess();
  moveHistory.forEach(move => chess.move(move));
  return chess;
}

function getActivePlayer(chess: Chess, state: GameState) {
  const { white, black } = state;
  
  if (chess.isGameOver()) {
    return { ...state.activePlayer };
  }

  return chess.turn() === "w"
    ? { ...white }
    : { ...black };
}

function mapToDrawReason(chess: Chess): DrawReasonType | undefined {
  if (!chess.isDraw)  {
    return undefined;
  }

  if (chess.isStalemate()) {
    return "Stalemate";
  }

  if (chess.isThreefoldRepetition()) {
    return "Threefold Repetition";
  }

  if (chess.isInsufficientMaterial()) {
    return "Insufficient Material";
  }

  return "50 Move Rule";
}

export default reducer;
