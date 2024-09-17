export type ChessColour = "White" | "Black";
export type PlayerType = "Bot" | "Human";
export type BotType = "Custom" | "Resident";
export type DrawReasonType = "Stalemate" | "Threefold Repetition" | "Insufficient Material" | "50 Move Rule";

export type Player = {
  colour: ChessColour;
  playerType: PlayerType;
  name: string;
  botId?: string;
  elo?: number;
};

export type GameState = {
  white: Player;
  black: Player;
  fen: string;
  moveHistory: string[];
  activePlayer: Player;
  isGameOver: boolean;
  isDraw: boolean;
  drawReason?: DrawReasonType;
  chessBots: ChessBot[];
};

export type ChessBot = {
  id: string;
  name: string;
  elo: number;
};

export type Action = { type: "SET_CHESSBOTS", payload: ChessBot[]; }
  | { type: "SET_WHITE"; payload: Player; }
  | { type: "SET_BLACK"; payload: Player; }
  | { type: "RESET_GAME" }
  | { type: "START_GAME"; }
  | { type: "MAKE_MOVE"; payload: string };

export interface MoveResponse {
  move: string | null;
}
