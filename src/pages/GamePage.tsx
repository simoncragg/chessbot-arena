import type { Square } from "chess.js";
import type { ColoredChessPiece, PieceMove } from "../types";

import React, { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

import GameOverModal from "../components/GameOverModal";
import PlayerStatusBar from "../components/PlayerStatusBar";
import getNextMove from "../services/getNextMove";
import { getRandomInt, isValidMove } from "../utils";
import { useGame } from "../GameContext";

const GamePage: React.FC = () => {

  const { state, dispatch } = useGame();
  const {
    white,
    black, 
    fen, 
    activePlayer,
    whiteCaptures, 
    blackCaptures,
    isGameOver,
  } = state;

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

  const isDraggablePiece = (args: { piece: ColoredChessPiece; }): boolean => {
    const pieceColour = args.piece.substring(0, 1) === "w" ? "White" : "Black";
    return pieceColour === activePlayer.colour;
  };

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
      const move: PieceMove = { 
        from: sourceSquare,
        to: targetSquare,
        promotion: "q"
      };

      if (isValidMove(move, fen)) {
        dispatch({type: "MAKE_MOVE", payload: move });
        return true;
      }

      return false;
  };

   return (
    <div className="flex flex-col items-center w-full bg-neutral-900">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-4 items-center relative">

          {black.playerType === "Human" && white.playerType === "Bot" ? (
            <>
              <PlayerStatusBar player={white} captures={whiteCaptures} opponentCaptures={blackCaptures} />
              <Chessboard boardOrientation="black" position={fen} isDraggablePiece={isDraggablePiece} onPieceDrop={onPieceDrop} />
              <PlayerStatusBar player={black} captures={blackCaptures} opponentCaptures={whiteCaptures} />
            </>
          ) : (
            <>
              <PlayerStatusBar player={black} captures={blackCaptures} opponentCaptures={whiteCaptures} />
              <Chessboard boardOrientation="white" position={fen} isDraggablePiece={isDraggablePiece} onPieceDrop={onPieceDrop} />
              <PlayerStatusBar player={white} captures={whiteCaptures} opponentCaptures={blackCaptures} />
            </>
          )}
          
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
