import type { Square } from "chess.js";
import type { ColoredChessPiece, PieceMove } from "../types";

import React, { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

import GameOverModal from "../components/GameOverModal";
import PlayerStatusBar from "../components/PlayerStatusBar";
import getNextMove from "../services/getNextMove";
import { getRandomInt, isValidMove } from "../utils";
import { useGame } from "../GameContext";

const MOVE_HIGHLIGHT_COLOR = "rgba(255, 255, 0, 0.4)";

type MoveSquares = Partial<Record<Square, { background: string }>>;

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

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveSquares, setMoveSquares] = useState<MoveSquares>({});
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
    if (lastMove) {
      setMoveSquares({
        [lastMove.from]: { background: MOVE_HIGHLIGHT_COLOR },
        [lastMove.to]: { background: MOVE_HIGHLIGHT_COLOR }
      });
      setMoveFrom(null);
    }
  }, [lastMove]);

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

  const onPieceDrop = (
    sourceSquare: Square, 
    targetSquare: Square, 
    piece: ColoredChessPiece
  ): boolean => {

      const move: PieceMove = { 
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q"
      };

      if (isValidMove(move, fen)) {
        dispatch({type: "MAKE_MOVE", payload: move });
        return true;
      }

      return false;
  };

  const onSquareClick = (
    square: Square, 
    piece: ColoredChessPiece | undefined
): boolean => {

    if (square === moveFrom) {
      setMoveSquares({});
      return false;
    }
 
    if (piece && piece[0].toLowerCase() == activePlayer.colour[0].toLowerCase()) {
      setMoveFrom(square);
      setMoveSquares({[square] : { background: "rgba(255, 255, 0, 0.4)" } });
      return false;
    }

    const move: PieceMove = { 
      from: moveFrom as string,
      to: square as string,
      promotion: "q"
    };

    if (isValidMove(move, fen)) {
      dispatch({type: "MAKE_MOVE", payload: move });
    }

    return false;
  };

   return (
    <div className="flex flex-col items-center w-full bg-neutral-900">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-4 items-center relative">

          {activePlayer.playerType === "Bot" && <div className="loader absolute top-4 right-6"></div>}

          {boardOrientation === "white"
            ? <PlayerStatusBar player={black} captures={blackCaptures} opponentCaptures={whiteCaptures} />
            : <PlayerStatusBar player={white} captures={whiteCaptures} opponentCaptures={blackCaptures} />
          }

          <Chessboard 
            boardOrientation={boardOrientation} 
            position={fen} 
            isDraggablePiece={isDraggablePiece} 
            onPieceDrop={onPieceDrop}
            onSquareClick={onSquareClick}
            customSquareStyles={{ ...moveSquares }}
          />

          {boardOrientation === "white"
            ? <PlayerStatusBar player={white} captures={whiteCaptures} opponentCaptures={blackCaptures} />
            : <PlayerStatusBar player={black} captures={blackCaptures} opponentCaptures={whiteCaptures} />
          }

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
