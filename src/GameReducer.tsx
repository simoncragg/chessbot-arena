import type { Move } from "chess.js";
import type { 
  Action, 
  CapturedPieces, 
  CapturedPieceSymbol,
  ChessBot, 
  ChessColour,
  DrawReasonType, 
  GameState, 
  Player
} from "./types";

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

    case "RESET_GAME":
      return resetGame(state);

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

function resetGame(state: GameState) {
  const chess = new Chess();
  const white: Player = { colour: "White", playerType: "Bot", name: "" };
  const black: Player = { colour: "Black", playerType: "Bot", name: "" };

  return { 
    ...state,
    fen: chess.fen(),
    white,
    black,
    moveHistory: [],
    activePlayer: { ...state.white },
    isGameOver: false,
    isDraw: false,
  };
}

function startGame(state: GameState) {
  const chess = new Chess();

  return { 
    ...state,
    fen: chess.fen(),
    moveHistory: [],
    activePlayer: { ...state.white },
    capturedWhitePieces: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    capturedBlackPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 },
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

function makeMove(state: GameState, moveSan: string) {
  let move: Move | undefined;
  const chess = initChessObject(state.moveHistory);
  console.log(`${state.activePlayer.colour} move: ${moveSan}`);
  try {
    move = chess.move(moveSan);
  }
  catch (err: unknown) {
    console.log(err, {state});
  }

  return { 
    ...state,
    fen: chess.fen(),
    moveHistory: [... state.moveHistory, moveSan],
    activePlayer: getActivePlayer(chess, state),
    capturedWhitePieces: getCapturedPieces(state, "Black", move),
    capturedBlackPieces: getCapturedPieces(state, "White", move),
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

function getCapturedPieces(
  state: GameState, 
  capturingColour: ChessColour,
  move?: Move
): CapturedPieces {

  const capturedPieces = 
    capturingColour === "White" 
    ? { ...state.capturedBlackPieces } 
    : { ...state.capturedWhitePieces};

  if (state.activePlayer.colour === capturingColour && move?.captured) {
    capturedPieces[move.captured as CapturedPieceSymbol] += 1;
  }

  return capturedPieces;
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
