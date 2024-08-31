export type ChessColour = "White" | "Black";

export type ChessBot = {
  colour: ChessColour;
  name?: string;
  url?: string;
};

export type GameState = {
  whiteBot: ChessBot;
  blackBot: ChessBot;
};

export type Action =
  | { type: 'SET_WHITE_BOT'; payload: ChessBot }
  | { type: 'SET_BLACK_BOT'; payload: ChessBot };

