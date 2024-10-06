import type { AppState } from "../types";
import type { Action, ChessBot } from "../types";
import gameReducer from "./GameReducer";

const reducer = (state: AppState, action: Action): AppState => {
  
  switch (action.type) {

    case "SET_CHESSBOTS":
      return setChessBots(state, action.payload);

    default: 
      return {
        ...state,
        game: gameReducer(state.game, action)
      };
  }
};

function setChessBots(state: AppState, payload: ChessBot[]) {
  return { ...state, chessBots: payload };
}

export default reducer;
