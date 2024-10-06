import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Button from "./Button";
import { useGame } from "../AppContext";

const GameControlBar = () => {

  const { game , dispatch} = useGame();
  const { moveHistory, currentMoveIndex, activePlayer, isGameOver } = game;

  return (
    <div className="flex mt-8 p-2 bg-neutral-800 justify-between rounded w-full">

      <div className="flex justify-start gap-2"></div>

      <div className="flex justify-end gap-2">
        <Button 
          type="button"
          variant="tertiary"
          padding="tight"
          disabled={(activePlayer.playerType === "Bot" && !isGameOver) || currentMoveIndex === 0}
          onClick={() => dispatch({ type: "NAVIGATE_BACK"})}
        >
          <FaChevronLeft />
        </Button>

        <Button 
          type="button"
          variant="tertiary"
          padding="tight"
          disabled={(activePlayer.playerType === "Bot" && !isGameOver) || currentMoveIndex === moveHistory.length - 1}
          onClick={() => dispatch({ type: "NAVIGATE_FORWARD"})}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default GameControlBar;
