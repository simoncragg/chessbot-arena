import type { Captures, Player } from "../types";

import React from "react";
import { FaEdit } from "react-icons/fa";
import CapturedPiecesTray from "./CapturedPiecesTray";
import Avatar from "./Avatar";
import Pulse from "./Pulse";
import Button from "./Button";

interface PlayerStatusBarProps {
  player: Player,
  captures?: Captures;
  opponentCaptures?: Captures;
  isThinking?: boolean;
  onEditClick?: () => void
}

const PlayerStatusBar: React.FC<PlayerStatusBarProps> = ({ 
  player, 
  captures,
  opponentCaptures,
  isThinking,
  onEditClick 
}) => {

  const playerMaterial = captures?.materialScore ?? 0;
  const opponentMaterial = opponentCaptures?.materialScore ?? 0;

  const materialAdvantage = playerMaterial > opponentMaterial
    ? playerMaterial - opponentMaterial
    : null;

  return (
      <div className="flex flex-row items-center justify-between w-full">

        <div className="flex flex-row items-start gap-3 w-full">
          <Avatar player={player} className="w-12" />

          <div className="flex flex-col items-start -my-1">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-lg">{player?.name}</span>
              {!onEditClick && <span className="text-sm font-light">({player.elo})</span>}
              {isThinking && <Pulse className="mt-0.5 ml-1.5" />}
            </div>
            {onEditClick && <span className="text-sm font-light">{player.elo} elo</span>}
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
          <Button
            type="button"
            variant="tertiary"
            padding="tight"
            onClick={onEditClick}
          >
            <span className="text-base font-normal">Edit</span>
            <FaEdit className="w-5 h-5" />
          </Button>
        )}
        
      </div>
  );
};

export default PlayerStatusBar;
