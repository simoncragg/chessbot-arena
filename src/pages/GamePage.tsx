import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { makeNextMove, getRandomInt } from "../utils";
import { useGame } from "../GameContext";

const GamePage = () => {

  const { state, dispatch } = useGame();
  const { fen, activePlayer, isGameOver, isDraw } = state;

  useEffect(() => {
    dispatch({ type: "START_GAME" });
  }, [dispatch]);

  useEffect(() => {

    const botId = activePlayer.botId;
    if (botId && !isGameOver) {
      setTimeout(() => {
        makeNextMove({fen, botId}, (move: string) => {
          dispatch({ type: "MAKE_MOVE", payload: move });
        });
      }, getRandomInt(500, 3000));
    }

  }, [fen, activePlayer, isGameOver, dispatch]);

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-4">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-4 items-center">
          <span className="text-xl">{ state.black.name }</span>
          <Chessboard position={fen} />
          <span className="text-xl items-center">{ state.white.name }</span>
          
            {isGameOver && !isDraw && (
              <span className="text-2xl">{activePlayer.name} wins!</span>
            )}

            {isGameOver && isDraw && (
              <span className="text-2xl">Draw!</span>
            )}

        </div>
      </div>
    </div>
  );
};

export default GamePage;
