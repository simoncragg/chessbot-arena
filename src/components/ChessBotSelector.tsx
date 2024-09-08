import type { ChessBot } from "../types";
import React from "react";
import OptionSelector from "./OptionSelector";

interface ChessBotSelectorProps {
  chessBots: ChessBot[],
  selectedBot?: ChessBot;
	onChessBotSelected: (chessBot: ChessBot) => void;
}

const ChessBotSelector: React.FC<ChessBotSelectorProps> = ({ chessBots, selectedBot, onChessBotSelected }) => {

  const renderChessBot = (bot: ChessBot) => (
    <div className="flex flex-col items-start">
      <span>{bot.name}</span>
      <span className="text-gray-400 text-xs">{bot.elo} elo</span>
    </div>
  );

  return (
    <OptionSelector
			prompt="Select a Chess Bot"
			options={chessBots}
      renderOption={renderChessBot}
      selectedOption={selectedBot}
      onOptionSelected={option => onChessBotSelected(option)}
    />
  );
};

export default ChessBotSelector;
