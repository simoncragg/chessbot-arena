import type { PieceSymbol } from "chess.js";
import type { CapturedPieces, ColoredChessPiece, Player  } from "../types";
import React, { ReactNode } from "react";
import { offBoardPieces } from "../svg/offBoardPieces";

interface CapturedPiecesTrayProps {
  player: Player;
  capturedPieces: CapturedPieces;
}

const CapturedPiecesTray: React.FC<CapturedPiecesTrayProps> = ({ player, capturedPieces }) => {
  
  const mapToColoredChessPieces = (
    capturedPieces: CapturedPieces, 
    pieceSymbol: PieceSymbol, 
    player: Player): ColoredChessPiece [] => {

    const colourSymbol = player.colour === "White" ? "b" : "w";
    const captureCount = capturedPieces[pieceSymbol as keyof CapturedPieces];
    
    return Array(captureCount)
      .fill(`${colourSymbol}${pieceSymbol.toUpperCase()}`) as ColoredChessPiece[];
  };

  const pawns = mapToColoredChessPieces(capturedPieces, "p", player);
  const knights = mapToColoredChessPieces(capturedPieces, "n", player);
  const bishops = mapToColoredChessPieces(capturedPieces, "b", player);
  const rooks = mapToColoredChessPieces(capturedPieces, "r", player);
  const queens = mapToColoredChessPieces(capturedPieces, "q", player);
 
  const pieceGroups = [
    { pieces: pawns, label: "pawns" },
    { pieces: knights, label: "knights" },
    { pieces: bishops, label: "bishops" },
    { pieces: rooks, label: "rooks" },
    { pieces: queens, label: "queens" }
  ];

  return (
    <div className="flex flex-row">
      {pieceGroups.map((group) => (
        <div key={group.label} className="flex mr-1">
          {group.pieces.map((piece, i) => {
            const pieceNode = offBoardPieces[piece];
            return (
              <svg
                key={`captured-piece-${group.label}-${i}`}
                style={{
                  marginLeft: i > 0 ? -16 : -4,
                  zIndex: i
                }}
                viewBox={"1 1 43 43"}
                width={24}
                height={24}
              >
                <g>{pieceNode as ReactNode}</g>
              </svg>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CapturedPiecesTray;
