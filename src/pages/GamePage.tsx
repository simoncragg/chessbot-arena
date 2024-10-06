import React, { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

import GameOverModal from "../components/GameOverModal";
import PlayerStatusBar from "../components/PlayerStatusBar";
import getNextMove from "../services/getNextMove";
import { MOVE_HIGHLIGHT_COLOR } from "../constants";
import { getRandomInt } from "../utils";
import { useGame } from "../AppContext";
import { useHumanMove } from "../hooks/useHumanMove";
import GameControlBar from "../components/GameControlBar";

const GamePage: React.FC = () => {
  const { game, dispatch } = useGame();

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
  } = game;

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

  const [isThinking, setIsThinking] = useState<boolean>(false);
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
      setIsThinking(true);
      setTimeout(() => {
        getNextMove({ fen, botId }, result => {
          setIsThinking(false);
          dispatch({ type: "MAKE_MOVE", payload: result });
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
        <div className="flex flex-col gap-4 items-start w-96 md:w-vh-minus-300 relative">
          
          <div className="px-5">
            {boardOrientation === "white" ? (
              <PlayerStatusBar
                player={black}
                captures={blackCaptures}
                opponentCaptures={whiteCaptures}
                isThinking={activePlayer.colour === "Black" && isThinking}
              />
            ) : (
              <PlayerStatusBar
                player={white}
                captures={whiteCaptures}
                opponentCaptures={blackCaptures}
                isThinking={activePlayer.colour === "White" && isThinking}
              />
            )}
          </div>

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

          <div className="px-5">
            {boardOrientation === "white" ? (
              <PlayerStatusBar
                player={white}
                captures={whiteCaptures}
                opponentCaptures={blackCaptures}
                isThinking={activePlayer.colour === "White" && isThinking}
              />
            ) : (
              <PlayerStatusBar
                player={black}
                captures={blackCaptures}
                opponentCaptures={whiteCaptures}
                isThinking={activePlayer.colour === "Black" && isThinking}
              />
            )}
          </div>

          <GameControlBar />

          {isGameOverModalOpen && (
            <GameOverModal
              onRematch={() => {
                setMoveSquares({});
                dispatch({ type: "REMATCH" });
              }}
              onClose={() => setIsGameOverModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
