import { FaChevronLeft, FaChevronRight, FaList } from "react-icons/fa";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useState } from "react";

import Button from "./Button";
import { useGame } from "../AppContext";

const GameControlBar = () => {

  const { game , dispatch} = useGame();
  const { moveHistory, currentMoveIndex, activePlayer, isGameOver } = game;
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <div className="flex mt-8 p-2 gap-2 justify-evenly w-full">
        <Button 
          type="button"
          variant="tertiary"
          width="flex-grow md:flex-grow-0 md:w-32"
          onClick={() => setMessage("Sorry, 'Options' isn't implemented yet 😞")}
        >
          <FaList className="w-5 h-5" /> <span className="text-lg hidden md:block">Options</span>
        </Button>

        <Button 
          type="button"
          variant="tertiary"
          padding="tight"
          width="flex-grow md:flex-grow-0 md:w-32"
          disabled={(activePlayer.playerType === "Bot" && !isGameOver) || currentMoveIndex === 0}
          onClick={() => {
            setMessage("");
            dispatch({ type: "NAVIGATE_BACK"});
          }}
        >
          <FaChevronLeft className="w-5 h-5" /> <span className="text-lg hidden md:block">Back</span>
        </Button>

        <Button 
          type="button"
          variant="tertiary"
          padding="tight"
          width="flex-grow md:flex-grow-0 md:w-32"
          disabled={(activePlayer.playerType === "Bot" && !isGameOver) || currentMoveIndex === moveHistory.length - 1}
          onClick={() => {
            setMessage("");
            dispatch({ type: "NAVIGATE_FORWARD" });
          }}
        >
          <FaChevronRight className="w-5 h-5" /> <span className="text-lg hidden md:block">Forward</span>
        </Button>

        <Button 
          type="button"
          variant="tertiary"
          padding="tight"
          width="flex-grow md:flex-grow-0 md:w-32"
          onClick={() => setMessage("Sorry, 'Hint' isn't implemented yet 😞")}
        >
          <RiLightbulbFlashLine className="w-6 h-6" /> <span className="text-lg hidden md:block">Hint</span>
        </Button>
      </div>

      {message && message !== "" &&
        <div className="flex flex-row justify-center text-gray-400 w-full">
          <p className="text-lg md:text-xl">{message}</p>
        </div>
      }
    </>
  );
};

export default GameControlBar;
