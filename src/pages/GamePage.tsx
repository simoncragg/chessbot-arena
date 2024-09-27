import React, { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

import GameOverModal from "../components/GameOverModal";
import PlayerStatusBar from "../components/PlayerStatusBar";
import getNextMove from "../services/getNextMove";
import { getRandomInt } from "../utils";
import { useGame } from "../GameContext";

const GamePage: React.FC = () => {

  const { state, dispatch } = useGame();
  const {
    white,
    black, 
    fen, 
    activePlayer,
    capturedWhitePieces, 
    capturedBlackPieces,
    isGameOver,
  } = state;

  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState<boolean>(false);
  const isFirstMoveRef = useRef<boolean>(true);

  useEffect(() => {
    dispatch({ type: "START_GAME" });
  }, [dispatch]);

  useEffect(() => {
    const botId = activePlayer.botId;
    
    if (botId && !isGameOver) {
      const delayMs = getDelay(botId);
      isFirstMoveRef.current = false;

      setTimeout(() => {
        getNextMove({fen, botId}, (move: string) => {
          dispatch({ type: "MAKE_MOVE", payload: move });
        });
      }, delayMs);
    }

  }, [fen, activePlayer, isGameOver, dispatch]);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => setIsGameOverModalOpen(true), 1000);
    }
  }, [isGameOver]);

  const getDelay = (botId: string) => {
    return isFirstMoveRef.current || isAlphabot(botId)
      ? 0
      : getRandomInt(500, 3000);
  }

  const isAlphabot = (botId: string): boolean => {
    return botId === "ae55ae42-8c32-4605-93ae-399b013dc8ca";
  };

   return (
    <div className="flex flex-col items-center w-full bg-neutral-900">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-4 items-center relative">
          <PlayerStatusBar player={black} capturedPieces={capturedWhitePieces} />
          <Chessboard position={fen} isDraggablePiece={() => false} />
          <PlayerStatusBar player={white} capturedPieces={capturedBlackPieces} />
          
            {isGameOverModalOpen && (
              <GameOverModal 
                onRematch={() => dispatch({ type: "START_GAME"})}
                onClose={() => setIsGameOverModalOpen(false)}
              />
            )}

        </div>
      </div>
    </div>
  );
};

export default GamePage;
