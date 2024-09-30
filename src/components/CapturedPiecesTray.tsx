import type { PieceSymbol } from "chess.js";
import type { CapturedPieces, PieceWithColor, Player  } from "../types";
import React, { ReactNode } from "react";
import { offBoardPieces } from "../svg/offBoardPieces";

interface CapturedPiecesTrayProps {
  player: Player;
  capturedPieces: CapturedPieces;
}

const CapturedPiecesTray: React.FC<CapturedPiecesTrayProps> = ({ player, capturedPieces }) => {
  
  const mapToPieceWithColors = (
    capturedPieces: CapturedPieces, 
    pieceSymbol: PieceSymbol, 
    player: Player): PieceWithColor [] => {

    const colourSymbol = player.colour === "White" ? "b" : "w";
    const captureCount = capturedPieces[pieceSymbol as keyof CapturedPieces];
    
    return Array(captureCount)
      .fill(`${colourSymbol}${pieceSymbol.toUpperCase()}`) as PieceWithColor[];
  };

  const pawns = mapToPieceWithColors(capturedPieces, "p", player);
  const knights = mapToPieceWithColors(capturedPieces, "n", player);
  const bishops = mapToPieceWithColors(capturedPieces, "b", player);
  const rooks = mapToPieceWithColors(capturedPieces, "r", player);
  const queens = mapToPieceWithColors(capturedPieces, "q", player);
 
  const pieceGroups = [
    { pieces: pawns, label: "pawns" },
    { pieces: knights, label: "knights" },
    { pieces: bishops, label: "bishops" },
    { pieces: rooks, label: "rooks" },
    { pieces: queens, label: "queens" }
  ];

  return (
    <div className="flex flex-row">
      {pieceGroups.map(group => (
        <div key={group.label} className={`flex ${group.pieces.length > 0 ? "mr-1" : ""}`}>
          {group.pieces.map((piece, pieceIdx) => {
            const pieceNode = offBoardPieces[piece];
            return (
              <svg
                key={`captured-piece-${group.label}-${pieceIdx}`}
                style={{
                  marginLeft: pieceIdx > 0 ? -16 : -4,
                  zIndex: pieceIdx
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
