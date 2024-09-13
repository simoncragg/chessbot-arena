import type { Player} from "../types";

import React from "react";
import { FaEdit } from "react-icons/fa";

interface PlayerStatusBarProps {
  player: Player,
  onClick?: () => void
}

const PlayerStatusBar: React.FC<PlayerStatusBarProps> = ({ player, onClick }) => {

  return (
      <div className="flex flex-row items-center justify-between px-5 w-full">

        <div className="flex flex-row items-start gap-2 w-full">
          <img src={`/avatars/${player.botId}-min.jpg`} alt={`${player.name || ""} avatar`} width="48" />
          <div className="flex flex-col items-start">
            <span className="text-lg leading-0">{player?.name}</span>
            {player.elo && (
              <span className="text-sm font-light">{player.elo} elo</span>
            )}
          </div>
        </div>
        
        {onClick && ( 
          <button 
            type="button" 
            className="flex flex-row gap-2.5 px-3 py-1.5 items-center border border-neutral-500 rounded-md"
            onClick={onClick}
          >
            <span className="text-base font-normal">Edit</span>
            <FaEdit className="w-5 h-5" />
          </button>
        )}
        
      </div>
  );
}

export default PlayerStatusBar;
