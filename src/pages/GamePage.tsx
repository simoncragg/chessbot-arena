import { useEffect, useRef } from "react";
import { Chessboard } from "react-chessboard";

import PlayerStatusBar from "../components/PlayerStatusBar";
import getNextMove from "../services/getNextMove";
import { getRandomInt } from "../utils";
import { useGame } from "../GameContext";

const GamePage = () => {

  const { state, dispatch } = useGame();
  const {
    white,
    black, 
    fen, 
    activePlayer, 
    isGameOver, 
    isDraw 
  } = state;

  const isFirstMoveRef = useRef<boolean>(true);

  useEffect(() => {
    dispatch({ type: "START_GAME" });
  }, [dispatch]);

  useEffect(() => {

    const botId = activePlayer.botId;
    if (botId && !isGameOver) {
      
      const delayMs = isFirstMoveRef.current
        ? 0 
        : getRandomInt(500, 3000);

      isFirstMoveRef.current = false;

      setTimeout(() => {
        getNextMove({fen, botId}, (move: string) => {
          dispatch({ type: "MAKE_MOVE", payload: move });
        });
      }, delayMs);
    }

  }, [fen, activePlayer, isGameOver, dispatch]);

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-4 items-center">
          <PlayerStatusBar player={black} />
          <Chessboard position={fen} isDraggablePiece={() => false} />
          <PlayerStatusBar player={white} />
          
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
