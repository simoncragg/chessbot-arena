import type { PieceSymbol } from "chess.js";

export type BoardOrientation = "white" | "black";
export type BotType = "Custom" | "Resident";
export type CapturedPieceSymbol = Exclude<PieceSymbol, "k">;
export type CapturedPieces = Record<CapturedPieceSymbol, number>;
export type DrawReasonType = "Stalemate" | "Threefold Repetition" | "Insufficient Material" | "50 Move Rule";
export type PieceColor = "White" | "Black";
export type PieceWithColor  = "wP" | "wB" | "wN" | "wR" | "wQ" | "wK" | "bP" | "bB" | "bN" | "bR" | "bQ" | "bK";
export type PlayerType = "Bot" | "Human";
export type PromotionPieceOption = "wQ" | "wR" | "wN" | "wB" | "bQ" | "bR" | "bN" | "bB";

export type AppState = {
  game: GameState;
  chessBots: ChessBot[];
};

export type GameState = {
  isActive: boolean,
  white: Player;
  black: Player;
  boardOrientation: BoardOrientation;
  fen: string;
  lastMove?: PieceMove;
  moveHistory: MoveHistoryEntry[];
  currentMoveIndex: number;
  isBoardLocked: boolean,
  activePlayer: Player;
  whiteCaptures: Captures,
  blackCaptures: Captures,
  isGameOver: boolean;
  isDraw: boolean;
  drawReason?: DrawReasonType;
};

export type ChessBot = {
  id: string;
  name: string;
  elo: number;
};

export type Player = {
  colour: PieceColor;
  playerType: PlayerType;
  name: string;
  botId?: string;
  elo?: number;
};

export type Captures = {
  capturedPieces: CapturedPieces;
  materialScore: number;
};

export type PieceMove = {
  from: string;
  to: string;
  promotion?: string;
  san?: string;
};

export type MoveHistoryEntry = {
  move?: PieceMove;
  postMoveFen: string;
};

export type Action = { type: "REHYDRATE_STATE", payload: AppState; }
  | { type: "SET_CHESSBOTS", payload: ChessBot[]; }
  | { type: "SET_WHITE"; payload: Player; }
  | { type: "SET_BLACK"; payload: Player; }
  | { type: "RESET_GAME" }
  | { type: "START_GAME"; }
  | { type: "MAKE_MOVE"; payload: MakeMovePayload } 
  | { type: "REMATCH"; }
  | { type: "NAVIGATE_BACK"; }
  | { type: "NAVIGATE_FORWARD"; };

export type MakeMovePayload = {
  move: string | PieceMove;
  fen: string;
};

export type MoveResponse = {
  move: string | null;
};

