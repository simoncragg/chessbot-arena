import type { ChessBot, Player, PlayerType } from "../types";

import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { GiPawn } from "react-icons/gi";
import { TbLoader2 } from "react-icons/tb";

import ChessBotSelector from "../components/ChessBotSelector";
import getBots from "../services/getBots";
import { isValidPlayer } from "../utils";
import { useGame } from "../GameContext";


interface PlayerFormProps {
	player: Player;
  submitText: string;
  onSubmit: (player: Player) => void; 
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, submitText, onSubmit }) => {

  const { state, dispatch } = useGame();
  const { chessBots } = state;

  const [playerType, setPlayerType] = useState<PlayerType>(player.playerType ?? "Bot");
  const [selectedBot, setSelectedBot] = useState<ChessBot | undefined>();

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chessBots.length === 0) {
      getBots((chessBots: ChessBot[]) => dispatch({ type: "SET_CHESSBOTS", payload: chessBots}));
    }
  }, [chessBots, dispatch]);

  useEffect(() => {
    const bot = chessBots.find(bot => bot.id === player.botId);
    if (bot) {
      setSelectedBot(bot);
    }
  }, [chessBots, player.botId]);

  const handleSubmit = () => {      
      const player = createPlayer();
      if (isValidPlayer(player)) {
        onSubmit(player);
      }
  };

  const createPlayer = (): Player => {
    const newPlayer: Player = {
      colour: player.colour,
      playerType: playerType,
      name: ""
    };

    return (playerType === "Human")
      ? {
          ...newPlayer,
          name: nameRef.current?.value ?? ""
        }
      : {
          ...newPlayer,
          name: selectedBot?.name ?? "",
          botId: selectedBot?.id,
          elo: selectedBot?.elo
      };
  }

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
            <div className="inline-flex w-full items-end justify-between rounded-md shadow-sm" role="group">
              <button 
                type="button" 
                className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white ${playerType === "Bot" ? "bg-stone-500" : "bg-neutral-800"} border border-gray-200 rounded-s-lg focus:z-10 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                onClick={() => setPlayerType("Bot")}
              >
                <div className="flex flex-col gap-1 items-center">
                  <FaRobot className="w-8 h-8" />
                  Bot
                </div>
              </button>
              <button 
                type="button" 
                className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white ${playerType === "Human" ? "bg-stone-500" : "bg-neutral-800"} border border-gray-200 rounded-e-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                onClick={() => setPlayerType("Human")}
              >
                <div className="flex flex-col gap-1.5 items-center">
                  <FaUser className="w-7 h-7 mt-0.5" />
                  Human
                </div>
              </button>
            </div>
          </div>

          {(playerType === "Bot") && (

            chessBots.length > 0 ? (
              <ChessBotSelector 
                chessBots={chessBots} 
                selectedBot={selectedBot} 
                onChessBotSelected={chessBot => setSelectedBot(chessBot)}
              />
            ) : (
              <LoadingBar />
            )
          )}

          {(playerType === "Human") && (
            <div>
              <label htmlFor="name" className="block mb-2 text-base font-medium text-white">Name</label>
              <input 
                ref={nameRef}  
                type="text" 
                id="name"
                className="text-base rounded-lg block w-full border p-2.5 bg-neutral-700 text-white" 
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

const LoadingBar: React.FC = () => {
  return (
    <div className="flex flex-row rounded-md border border-white px-4 py-2 gap-2 items-center justify-between">
      <span className="text-base font-semibold">Loading bots ...</span>
      <TbLoader2 className="w-6 h-6 text-white rounded-full animate-[spin_1.5s_linear_infinite]" />
    </div>
  );
}  

export default PlayerForm;
