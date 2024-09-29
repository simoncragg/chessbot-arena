import type { Captures, Player } from "../types";

import React from "react";
import { FaEdit } from "react-icons/fa";
import CapturedPiecesTray from "./CapturedPiecesTray";
import Avatar from "./Avatar";

interface PlayerStatusBarProps {
  player: Player,
  captures?: Captures;
  opponentCaptures?: Captures;
  onEditClick?: () => void
}

const PlayerStatusBar: React.FC<PlayerStatusBarProps> = ({ 
  player, 
  captures,
  opponentCaptures,
  onEditClick 
}) => {

  const playerMaterial = captures?.materialScore ?? 0;
  const opponentMaterial = opponentCaptures?.materialScore ?? 0;

  const materialAdvantage = playerMaterial > opponentMaterial
    ? playerMaterial - opponentMaterial
    : null;

  return (
      <div className="flex flex-row items-center justify-between px-5 w-full">

        <div className="flex flex-row items-start gap-2 w-full">
          <Avatar player={player} className="w-12" />

          <div className="flex flex-col items-start -my-1">
            <span className="text-lg leading-0">{player?.name}</span>
            {onEditClick && player.elo && (
              <span className="text-sm font-light">{player.elo} elo</span>
            )}

            {captures?.capturedPieces && (
              <div className="flex flex-row">
                <CapturedPiecesTray player={player} capturedPieces={captures.capturedPieces} />
                {materialAdvantage && (
                  <div className="inline-flex px-1 text-base rounded">
                    +{materialAdvantage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {onEditClick && ( 
          <button 
            type="button" 
            className="flex flex-row gap-2.5 px-3 py-1.5 items-center border border-neutral-500 rounded-md"
            onClick={onEditClick}
          >
            <span className="text-base font-normal">Edit</span>
            <FaEdit className="w-5 h-5" />
          </button>
        )}
        
      </div>
  );
};

export default PlayerStatusBar;
