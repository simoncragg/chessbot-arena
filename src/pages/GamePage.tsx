import React, { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

import GameOverModal from "../components/GameOverModal";
import PlayerStatusBar from "../components/PlayerStatusBar";
import getNextMove from "../services/getNextMove";
import { MOVE_HIGHLIGHT_COLOR } from "../constants";
import { getRandomInt } from "../utils";
import { useGame } from "../GameContext";
import { useHumanMove } from "../hooks/useHumanMove";

const GamePage: React.FC = () => {
  const { state, dispatch } = useGame();

  const {
    boardOrientation,
    white,
    black,
    fen,
    lastMove,
    activePlayer,
    whiteCaptures,
    blackCaptures,
    isGameOver,
  } = state;

  const {
    isDraggablePiece,
    onPieceDrop,
    onSquareClick,
    onPromotionPieceSelect,
    showPromotionDialog,
    moveSquares,
    setMoveSquares,
    moveTo,
  } = useHumanMove();

  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState<boolean>(false);
  const isFirstMoveRef = useRef<boolean>(true);

  useEffect(() => {
    dispatch({ type: "START_GAME" });
  }, [dispatch]);

  useEffect(() => {
    const { playerType, botId } = activePlayer;

    if (playerType === "Bot" && botId && !isGameOver) {
      const delayMs = getDelay(botId);
      isFirstMoveRef.current = false;

      setTimeout(() => {
        getNextMove({ fen, botId }, (move: string) => {
          dispatch({ type: "MAKE_MOVE", payload: move });
        });
      }, delayMs);
    }
  }, [fen, activePlayer, isGameOver, dispatch]);

  useEffect(() => {
    if (lastMove) {
      setMoveSquares({
        [lastMove.from]: { background: MOVE_HIGHLIGHT_COLOR },
        [lastMove.to]: { background: MOVE_HIGHLIGHT_COLOR },
      });
    }
  }, [lastMove, setMoveSquares]);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => setIsGameOverModalOpen(true), 1000);
    }
  }, [isGameOver]);

  const getDelay = (botId: string) => {
    return isFirstMoveRef.current || isAlphabot(botId) ? 0 : getRandomInt(500, 3000);
  };

  const isAlphabot = (botId: string): boolean => {
    return botId === "ae55ae42-8c32-4605-93ae-399b013dc8ca";
  };

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-4 items-center relative">
          {activePlayer.playerType === "Bot" && (
            <div className="loader absolute top-4 right-6"></div>
          )}

          {boardOrientation === "white" ? (
            <PlayerStatusBar
              player={black}
              captures={blackCaptures}
              opponentCaptures={whiteCaptures}
            />
          ) : (
            <PlayerStatusBar
              player={white}
              captures={whiteCaptures}
              opponentCaptures={blackCaptures}
            />
          )}

          <Chessboard
            boardOrientation={boardOrientation}
            position={fen}
            arePiecesDraggable={true}
            isDraggablePiece={isDraggablePiece}
            onPieceDrop={onPieceDrop}
            onSquareClick={onSquareClick}
            onPromotionPieceSelect={onPromotionPieceSelect}
            showPromotionDialog={showPromotionDialog}
            promotionToSquare={moveTo}
            customSquareStyles={{ ...moveSquares }}
          />

          {boardOrientation === "white" ? (
            <PlayerStatusBar
              player={white}
              captures={whiteCaptures}
              opponentCaptures={blackCaptures}
            />
          ) : (
            <PlayerStatusBar
              player={black}
              captures={blackCaptures}
              opponentCaptures={whiteCaptures}
            />
          )}

          {isGameOverModalOpen && (
            <GameOverModal
              onRematch={() => dispatch({ type: "START_GAME" })}
              onClose={() => setIsGameOverModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
