import type { PlayerType } from "../types";

import React from "react";
import { FaRobot, FaUser } from "react-icons/fa";

interface PlayerTypeButtonGroupProps {
  selected: PlayerType;
  onPlayerTypeSelected: (selection: PlayerType) => void;
}

const PlayerTypeButtonGroup: React.FC<PlayerTypeButtonGroupProps> = ({
  selected, 
  onPlayerTypeSelected
}) => {
  
  return (
    <div className="inline-flex rounded-md w-full" role="group">
      <button
        type="button"
        className={`inline-flex items-end justify-center px-4 py-2 text-base font-medium text-white w-full h-20 ${
        selected === "Bot" ? "bg-stone-500" : "bg-neutral-800"
        } border border-gray-200 rounded-s-lg focus:z-10 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
        onClick={() => onPlayerTypeSelected("Bot")}
      >
        <div className="flex flex-col gap-1 items-center">
          <FaRobot className="w-8 md:w-9 h-8 md:w-9 mt:0 md:mt-1" />
          Bot
        </div>
      </button>

      <button
        type="button"
        className={`inline-flex items-end justify-center px-4 py-2 text-base font-medium text-white w-full h-20 ${
        selected === "Human" ? "bg-stone-500" : "bg-neutral-800"
        } border border-gray-200 rounded-e-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
        onClick={() => onPlayerTypeSelected("Human")}
      >
        <div className="flex flex-col items-center gap-1.5">
          <FaUser className="w-7 md:-w-8 h-7 md:h-8" />
          Human
        </div>
      </button>
    </div>
  );
};

export default PlayerTypeButtonGroup;
