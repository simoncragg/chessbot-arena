export type ChessColour = "White" | "Black";

export type ChessBot = {
  colour: ChessColour;
  name?: string;
  url?: string;
};

export type GameState = {
  whiteBot: ChessBot;
  blackBot: ChessBot;
  fen: string | undefined;
  moveHistory: string[];
  activePlayer: ChessBot | undefined;
  isGameOver: boolean;
  isDraw: boolean;
};

export type Action =
  | { type: 'SET_WHITE_BOT'; payload: ChessBot }
  | { type: 'SET_BLACK_BOT'; payload: ChessBot }
  | { type: "INIT_GAME"; }
  | { type: "MAKE_MOVE"; payload: string };
