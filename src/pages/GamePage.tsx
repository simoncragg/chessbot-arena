import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { getRandomInt } from "../utils";
import { useGame } from "../GameContext";

const GamePage = () => {

  const { state, dispatch } = useGame();
  const { fen, activePlayer } = state;

  useEffect(() => {
    dispatch({ type: "INIT_GAME" });
  }, [dispatch]);

  useEffect(() => {

    const nextMove = async () => {
      const response = await fetch(activePlayer!.url!, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ fen }),
      });

      const result = await response.json();
      const { move } = result;
      console.log("nextMove", activePlayer!.colour, move);
      dispatch({ type: "MAKE_MOVE", payload: move });
    };
    
    if (activePlayer) {
      setTimeout(() => nextMove(), getRandomInt(500, 3000));
    }

  }, [dispatch, fen, activePlayer]);

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
