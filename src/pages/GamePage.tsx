import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { getRandomInt } from "../utils";
import { useGame } from "../GameContext";

const GamePage = () => {

  const { state, dispatch } = useGame();
  const { fen, currentTurn } = state;

  useEffect(() => {
    dispatch({ type: "INIT_GAME" });
  }, [dispatch]);

  useEffect(() => {

    const nextMove = async () => {
      const response = await fetch(currentTurn!.url!, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ fen }),
      });

      const result = await response.json();
      const { move } = result;
      console.log("nextMove", currentTurn!.colour, move);
      dispatch({ type: "MAKE_MOVE", payload: move });
    };
    
    if (currentTurn) {
      setTimeout(() => nextMove(), getRandomInt(500, 3000));
    }

  }, [dispatch, fen, currentTurn]);

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-8">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-8 items-center">
          <span className="text-2xl">{ state.blackBot.name }</span>
          <Chessboard position={fen} />
          <span className="text-2xl">{ state.whiteBot.name }</span>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
