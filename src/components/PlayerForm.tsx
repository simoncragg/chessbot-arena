import type { ChessBot, Player, PlayerType } from "../types";

import React, { useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { GiPawn } from "react-icons/gi";
import ChessBotSelector from "../components/ChessBotSelector";
import { isValidPlayer } from "../utils";

interface PlayerFormProps {
	player: Player;
  submitText: string;
  onSubmit: (player: Player) => void; 
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, submitText, onSubmit }) => {

  const chessBots = [
    { id: "1", name: "Mild Mildred", elo: 700 },
    { id: "2", name: "Savvy Sammy", elo: 1000 },
    { id: "3", name: "Keen Jean", elo: 1600 },
    { id: "4", name: "Elite Pete", elo: 2100 },
    { id: "5", name: "Grandmaster Jasper", elo: 2450 },
  ];

  const selectedBot = chessBots.find(bot => bot.id === player.botId);

  const [playerType, setPlayerType] = useState<PlayerType>(player.playerType ?? "Bot");
  const [chessBot, setChessBot] = useState<ChessBot | undefined>(selectedBot);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {      
      const updatedPlayer: Player = {
        colour: player.colour,
        playerType: playerType,
        botId: chessBot?.id,
        name: (
          playerType === "Human" 
            ? nameRef.current?.value
            : chessBot?.name
          ) ?? "",
      };

      if (isValidPlayer(updatedPlayer)) {
        onSubmit(updatedPlayer);
      }
  };

  const pawnTextColour = player.colour === "White" ? "text-white" : "text-black";
  const pawnBgColour = player.colour === "White" ? "bg-black" : "bg-white";

	return (
    <div className="flex flex-col">
      
      <div className="relative flex flex-col p-8 w-96 text-neutral-300 bg-neutral-800 rounded-md mb-8">

        <div className="flex flex-col w-full items-center gap-2">
          <div className={`p-2 ${pawnBgColour} rounded-full`}>
            <GiPawn className={`w-8 h-8 ${pawnTextColour}`} />
          </div>
          <span className="font-cinzel font-semibold text-2xl">{player.colour}</span>
        </div>

        <form className="flex flex-col gap-8 mt-8">

          <div>
            <div className="inline-flex w-full justify-between rounded-md shadow-sm" role="group">
              <button 
                type="button" 
                className={`inline-flex justify-center w-full px-4 py-2 text-md font-medium text-white ${playerType === "Bot" ? "bg-stone-500" : "bg-neutral-800"} border border-gray-200 rounded-s-lg focus:z-10 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                onClick={() => setPlayerType("Bot")}
              >
                <div className="flex flex-col gap-1 items-center">
                  <FaRobot className="w-8 h-8" />
                  Bot
                </div>
              </button>
              <button 
                type="button" 
                className={`inline-flex justify-center w-full px-4 py-2 text-md font-medium text-white ${playerType === "Human" ? "bg-stone-500" : "bg-neutral-800"} border border-gray-200 rounded-e-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                onClick={() => setPlayerType("Human")}
              >
                <div className="flex flex-col gap-1 items-center">
                  <FaUser className="w-6 h-6 mt-1" />
                  Human
                </div>
              </button>
            </div>
          </div>

          {playerType === "Bot" && (
            <ChessBotSelector 
              chessBots={chessBots} 
              selectedBot={selectedBot} 
              onChessBotSelected={chessBot => setChessBot(chessBot)}
            />
          )}

          {(playerType === "Human") && (
            <div>
              <label htmlFor="name" className="block mb-2 text-md font-medium text-white">Name</label>
              <input 
                ref={nameRef}  
                type="text" 
                id="name"
                className="text-md rounded-lg block w-full border p-2.5 bg-neutral-700 text-white" 
                defaultValue={player.name}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

        </form>
        
      </div>
      
      <button 
        type="submit" 
        className="text-xl border border-neutral-500 rounded-full p-2"
        onClick={() => handleSubmit()}
        >
          {submitText}
        </button>
    </div>
	);
}

export default PlayerForm;
