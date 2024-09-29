import type { ChessBot } from "../types";

import React from "react";
import OptionSelector from "./OptionSelector";

interface ChessBotSelectorProps {
  chessBots: ChessBot[],
  selectedBot?: ChessBot;
	onChessBotSelected: (chessBot: ChessBot) => void;
}

const ChessBotSelector: React.FC<ChessBotSelectorProps> = ({ chessBots, selectedBot, onChessBotSelected }) => {

  const renderBot = (bot: ChessBot) => (
    <div className="flex flex-row items-start gap-2">
      <img 
        src={`${import.meta.env.VITE_PUBLIC_URL}/avatars/${bot.id}-min.jpg`} 
        alt={`${bot.name} avatar`} 
        className="w-[50px]"
      />
      <div className="flex flex-col items-start">
        <span className="text-lg font-normal">{bot.name}</span>
        <span className="text-sm font-light">{bot.elo} elo</span>
      </div>
    </div>
  );

  return (
    <OptionSelector
			prompt="Select a Chess Bot"
			options={chessBots}
      renderOption={renderBot}
      selectedOption={selectedBot}
      onOptionSelected={option => onChessBotSelected(option)}
    />
  );
};

export default ChessBotSelector;
