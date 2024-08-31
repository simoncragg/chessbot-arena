import type { Action, GameState } from "./types";

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "SET_WHITE_BOT":
      return { ...state, whiteBot: action.payload };
    case "SET_BLACK_BOT":
      return { ...state, blackBot: action.payload };
    default:
      return state;
  }
};

export default reducer;
