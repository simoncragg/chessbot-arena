import type { Player} from "../types";

import React from "react";
import { FaEdit } from "react-icons/fa";

interface PlayerReviewBarProps {
  player: Player,
  onClick?: () => void
}

const PlayerReviewBar: React.FC<PlayerReviewBarProps> = ({ player, onClick }) => {

  return (
      <div className="flex flex-row items-start justify-between gap-1 w-full">

        <div className="flex flex-row items-start gap-2 bg-neutral-800 w-full">
          <img src={`/avatars/${player.botId}-min.jpg`} alt={`${player.name || ""} avatar`} width="48" />
          <div className="flex flex-col items-start">
            <span className="text-lg leading-0">{player?.name}</span>
            {player.elo && (
              <span className="text-sm font-light">{player.elo} elo</span>
            )}
          </div>
        </div>
        
        {onClick && (
          <div className="bg-neutral-800">
            <button 
              type="button" 
              className="p-3"
              onClick={onClick}
            >
              <FaEdit className="w-6 h-6 ml-1" />
            </button>
          </div>
        )}
        
      </div>
  );
}

export default PlayerReviewBar;
