import type { Square } from "chess.js";
import type { PieceWithColor, PieceMove, PromotionPieceOption } from "../types";

import { useState } from "react";

import { MOVE_HIGHLIGHT_COLOR } from "../constants";
import { isValidMove } from "../utils";
import { useGame } from "../GameContext";

type MoveSquares = Partial<Record<Square, { background: string }>>;

export const useHumanMove = () => {
  const { state, dispatch } = useGame();
  const { fen, activePlayer } = state;

  const [moveFrom, setMoveFrom] = useState<{ square: Square, piece: PieceWithColor} | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [moveSquares, setMoveSquares] = useState<MoveSquares>({});

  const createMove = (from: Square, to: Square, promotion: string = "q"): PieceMove => {
    return { from, to, promotion };
  };

  const requiresPromotion = (piece: PieceWithColor, targetSquare: Square): boolean => {
    return (
      (activePlayer.colour === "White" && piece[1] === "P" && targetSquare[1] === "8") ||
      (activePlayer.colour === "Black" && piece[1] === "P" && targetSquare[1] === "1")
    );
  };

  const isDraggablePiece = (args: { piece: PieceWithColor }): boolean => {
    const pieceColour = args.piece.substring(0, 1) === "w" ? "White" : "Black";
    return pieceColour === activePlayer.colour;
  };

  const onPieceDrop = (
    sourceSquare: Square, 
    targetSquare: Square, 
    piece: PieceWithColor
  ): boolean => {

    if (!requiresPromotion(piece, targetSquare)) {
      const move = createMove(sourceSquare, targetSquare, piece[1].toLowerCase());

      if (isValidMove(move, fen)) {
        dispatch({ type: "MAKE_MOVE", payload: {move, fen } });
        return true;
      }
    }

    return true;
  };

  const onSquareClick = (
    square: Square, 
    piece: PieceWithColor | undefined
  ): boolean => {

    if (square === moveFrom?.square) {
      setMoveSquares({});
      return false;
    }

    if (piece && piece[0] === activePlayer.colour[0].toLowerCase()) {
      setMoveFrom({ square, piece });
      setMoveSquares({ [square]: { background: MOVE_HIGHLIGHT_COLOR } });
      return false;
    }

    setMoveTo(square);

    if (requiresPromotion(moveFrom!.piece, square)) {
      setShowPromotionDialog(true);
      return false;
    }

    const move = createMove(moveFrom!.square, square);

    if (isValidMove(move, fen)) {
      dispatch({ type: "MAKE_MOVE", payload: { move, fen } });
    }

    return false;
  };

  const onPromotionPieceSelect = (piece?: PromotionPieceOption | undefined) => {

    if (!moveFrom) {
      return true;
    }

    if (!moveTo || !piece) {
      return false;
    }

    const move = createMove(moveFrom.square, moveTo, piece[1].toLowerCase() ?? "q");

    if (isValidMove(move, fen)) {
      dispatch({ type: "MAKE_MOVE", payload: { move, fen } });
      return true;
    }

    return true;
  };

  return {
    isDraggablePiece,
    onPieceDrop,
    onSquareClick,
    onPromotionPieceSelect,
    showPromotionDialog,
    setMoveSquares,
    moveSquares,
    moveTo
  };
};
