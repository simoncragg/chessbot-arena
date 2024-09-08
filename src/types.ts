export type ChessColour = "White" | "Black";
export type PlayerType = "Bot" | "Human";
export type BotType = "Custom" | "Resident";

export type Player = {
  colour: ChessColour;
  playerType: PlayerType;
  name: string;
  botId?: string;
};

export type GameState = {
  white: Player;
  black: Player;
  fen: string;
  moveHistory: string[];
  activePlayer: Player;
  isGameOver: boolean;
  isDraw: boolean;
};

export type ChessBot = {
  id: string;
  name: string;
  elo: number;
};

export type Action = { type: "SET_WHITE_PLAYER"; payload: Player; }
  | { type: "SET_BLACK_PLAYER"; payload: Player; }
  | { type: "START_GAME"; }
  | { type: "MAKE_MOVE"; payload: string };
