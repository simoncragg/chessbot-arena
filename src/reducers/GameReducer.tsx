import type { Move } from "chess.js";
import type { BoardOrientation, MakeMovePayload, MoveHistoryEntry } from "../types";
import type { 
  Action, 
  Captures, 
  CapturedPieceSymbol,
  DrawReasonType, 
  GameState,
  PieceColor,
  Player
} from "../types";

import { Chess } from "chess.js";

const reducer = (state: GameState, action: Action): GameState => {
  
  switch (action.type) {

    case "SET_WHITE":
      return setWhite(state, action.payload);

    case "SET_BLACK":
      return setBlack(state, action.payload);

    case "RESET_GAME":
      return resetGame(state);
    
    case "START_GAME":
      return startGame(state);

    case "MAKE_MOVE":
      return makeMove(state, action.payload);

    case "REMATCH":
      return rematch(state);
    
    case "NAVIGATE_BACK":
      return navigateBack(state);
  
    case "NAVIGATE_FORWARD":
      return navigateForward(state);

    default:
      return state;
  }
};

function setWhite(state: GameState, white: Player) {
  return { 
    ...state, 
    white: { ...white, elo: getElo(white) },
    boardOrientation: getBoardOrientation(white, state.black)
  };
}

function setBlack(state: GameState, black: Player) {
  return { 
    ...state, 
    black: { ...black, elo: getElo(black) },
    boardOrientation: getBoardOrientation(state.white, black)
  };
}

function resetGame(state: GameState) {
  const chess = new Chess();
  const fen = chess.fen();
  const white: Player = { colour: "White", playerType: "Bot", name: "" };
  const black: Player = { colour: "Black", playerType: "Bot", name: "" };

  return { 
    ...state,
    isActive: false,
    fen,
    white,
    black,
    lastMove: undefined,
    moveHistory: [{ postMoveFen: fen}],
    isBoardLocked: false,
    currentMoveIndex: 0,
    activePlayer: { ...state.white },
    whiteCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
    blackCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
    isGameOver: false,
    isDraw: false,
    boardOrientation: getBoardOrientation(white, black)
  };
}

function startGame(state: GameState) {

  if (state.moveHistory.length > 0) {
    return state;
  }

  const chess = new Chess();
  const fen = chess.fen();

  return { 
    ...state,
    isActive: true,
    fen,
    lastMove: undefined,
    moveHistory: [{ postMoveFen: fen}],
    currentMoveIndex: 0,
    isBoardLocked: false,
    activePlayer: { ...state.white },
    whiteCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
    blackCaptures: { capturedPieces: { p: 0, n: 0, b: 0, r: 0, q: 0 }, materialScore: 0 },
    isGameOver: false,
    isDraw: false,
    boardOrientation: getBoardOrientation(state.white, state.black)
  };
}

function makeMove(state: GameState, payload: MakeMovePayload) {

  if (payload.fen !== state.fen) {
    return state;
  }

  const chess = initChessObject(state.moveHistory);
  const move = chess.move(payload.move);
    
  if (move === null) {
    throw new Error("Invalid move");
  }

  console.log(`${state.activePlayer.colour} move: ${move.san}`);
  
  const fen = chess.fen();
  const moveHistoryEntry = { 
    move,
    san: move.san,
    postMoveFen: fen
  };

  return { 
    ...state,
    fen,
    lastMove: move,
    moveHistory: [...state.moveHistory, moveHistoryEntry],
    currentMoveIndex: state.moveHistory.length,
    activePlayer: getActivePlayer(chess, state),
    whiteCaptures: getCaptures(state, "White", move),
    blackCaptures: getCaptures(state, "Black", move),
    isGameOver: chess.isGameOver(),
    isDraw: chess.isDraw(),
    drawReason: mapToDrawReason(chess)
  };
}

function navigateBack(state: GameState) {
  if (state.currentMoveIndex > 0) {
    const moveIndex = state.currentMoveIndex - 1;
    const entry = state.moveHistory[moveIndex];

    return {
      ...state,
      fen: entry.postMoveFen,
      lastMove: entry.move,
      currentMoveIndex: moveIndex,
      isBoardLocked: moveIndex < state.moveHistory.length - 1
    };
  }

  return state;
}

function navigateForward(state: GameState) {
  if (state.currentMoveIndex < state.moveHistory.length - 1) {
    const moveIndex = state.currentMoveIndex + 1;
    const entry = state.moveHistory[moveIndex];

    return {
      ...state,
      fen: entry.postMoveFen,
      lastMove: entry.move,
      currentMoveIndex: moveIndex,
      isBoardLocked: moveIndex < state.moveHistory.length - 1
    };
  }

  return state;
}

function rematch(state: GameState) {
  return startGame({ ...state, moveHistory: []});
}

function initChessObject(moveHistory: MoveHistoryEntry[]): Chess {
  const chess = new Chess();
  moveHistory
    .filter((_, i) => i > 0)
    .forEach(({ move }) => chess.move(move!));
  return chess;
}

function getCaptures(
  state: GameState, 
  capturer: PieceColor,
  move?: Move
): Captures {

  const captures = 
    capturer === "White" 
      ? { ...state.whiteCaptures, capturedPieces: { ...state.whiteCaptures.capturedPieces } } 
      : { ...state.blackCaptures, capturedPieces: { ...state.blackCaptures.capturedPieces } };

  const materialValue = { p: 1, n: 3, b: 3, r: 5, q: 9 };

  if (state.activePlayer.colour === capturer && move?.captured) {
    const capturedPiece = move.captured as CapturedPieceSymbol;
    captures.capturedPieces[capturedPiece] += 1;
    captures.materialScore += materialValue[capturedPiece];
  }

  return captures;
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

function getBoardOrientation(white: Player, black: Player): BoardOrientation {
  return black.playerType === "Human" && white.playerType === "Bot"
    ? "black"
    : "white";
}

function getElo(player: Player): number {
  const defaultElo = 400;
  return player.playerType === "Bot"
    ? player.elo ?? defaultElo
    : defaultElo;
}

export default reducer;
