import type { CapturedPieces, Player } from "../types";

import React from "react";
import { FaEdit } from "react-icons/fa";
import CapturedPiecesTray from "./CapturedPiecesTray";

interface PlayerStatusBarProps {
  player: Player,
  capturedPieces?: CapturedPieces;
  onEditClick?: () => void
}

const PlayerStatusBar: React.FC<PlayerStatusBarProps> = ({ 
  player, 
  capturedPieces, 
  onEditClick 
}) => {

  return (
      <div className="flex flex-row items-center justify-between px-5 w-full">

        <div className="flex flex-row items-start gap-2 w-full">
          <img src={`/avatars/${player.botId}-min.jpg`} alt={`${player.name || ""} avatar`} width="48" />

          <div className="flex flex-col items-start -my-1">
              <span className="text-lg leading-0">{player?.name}</span>
              {onEditClick && player.elo && (
                <span className="text-sm font-light">{player.elo} elo</span>
              )}

              {capturedPieces && <CapturedPiecesTray player={player} capturedPieces={capturedPieces} />}
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
}

export default PlayerStatusBar;
