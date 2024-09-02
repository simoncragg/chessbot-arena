import type { ChessBot } from "../types";

import { GiPawn } from "react-icons/gi";
import React, { useRef } from "react";

interface ChessBotCardProps {
	chessBot: ChessBot;
  submitText: string;
  onSubmit: (chessBot: ChessBot) => void; 
}

const ChessBotCard: React.FC<ChessBotCardProps> = ({ chessBot, submitText, onSubmit }) => {

  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {      
      const bot: ChessBot = {
        colour: chessBot.colour,
        name: nameRef.current?.value,
        url: urlRef.current?.value
      };

      if (isValid(bot)) {
        onSubmit(bot);
      }
  };

  const isValid = (bot: ChessBot): boolean => {
    return (bot.name?.length ?? 0) > 0 && isValidUrl(bot.url ?? "");
  };

  const isValidUrl = (url: string): boolean => {
    const regex = /^(https:|http:|www\.)\S*/;
    return regex.test(url);
  }

  const pawnTextColour = chessBot.colour === "White" ? "text-white" : "text-black";
  const pawnBgColour = chessBot.colour === "White" ? "bg-black" : "bg-white";

	return (
    <div className="flex flex-col">
      
      <div className="relative flex flex-col p-8 w-96 text-neutral-300 bg-neutral-800 rounded-md mb-8">

        <div className="flex flex-col w-full items-center gap-2">
          <div className={`p-2 ${pawnBgColour} rounded-full`}>
            <GiPawn className={`w-8 h-8 ${pawnTextColour}`} />
          </div>
          <span className="font-cinzel font-semibold text-2xl">{chessBot.colour} BOT</span>
        </div>

        <form className="flex flex-col gap-8">

          <div>
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Name</label>
            <input 
              ref={nameRef}  
              type="text" 
              id="name"
              className="text-md rounded-lg block w-full p-2.5 bg-neutral-700 text-white focus:ring-blue-500 focus:border-blue-500" 
              defaultValue={chessBot.name} 
              required 
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">URL</label>
            <input 
              ref={urlRef} 
              type="text" 
              id="url" 
              className="text-md rounded-lg block w-full p-2.5 bg-neutral-700 text-white focus:ring-blue-500 focus:border-blue-500"
              defaultValue={chessBot.url}
              required
            />
            <button 
              type="button" 
              className="mt-2 text-neutral-900 text-xl bg-stone-400 border-b-4 border-stone-500 rounded-md p-2 w-full"
            >
              Test Connection
            </button>
          </div>
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

export default ChessBotCard;
