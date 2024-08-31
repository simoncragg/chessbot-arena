import type { ChessBot } from "../types";

import { Chessboard } from 'react-chessboard'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import ChessBotCard from '../components/ChessBotCard';

const NewGamePage = () => {
  
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [whiteBot, setWhiteBot] = useState<ChessBot>({ colour: "White" });
  const [blackBot, setBlackBot] = useState<ChessBot>({ colour: "Black" });

  const updateState = (chessBot: ChessBot) => {
    if (step === 1) {
      setWhiteBot(chessBot);
      setStep(2);
    } else {
      setBlackBot(chessBot);
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">

      <div className="flex flex-col md:flex-row gap-8 w-full">

        {step === 1 && (
          <ChessBotCard chessBot={whiteBot} submitText="Next" onSubmit={updateState} />
        )}

        {step === 2 && (
          <ChessBotCard chessBot={blackBot} submitText="Next" onSubmit={updateState} />
        )}

      </div>

    {step === 3 && (
      <div className="flex flex-col w-96 gap-4 items-center">

        <button 
          type="button" 
          className="text-xl text-white border border-neutral-500 rounded-full px-4"
          onClick={() => setStep(2)}
        >
          <div className="flex flex-row items-center gap-2">
            <span className="leading-8">{blackBot.name}</span>
            <FaEdit className="w-4 h-4" />
          </div>
        </button>

        <Chessboard id="defaultBoard" />
        
        <button 
          type="button" 
          className="text-xl text-white border border-neutral-500 rounded-full px-4"
          onClick={() => setStep(1)}
        >
          <div className="flex flex-row items-center gap-2">
            <span className="leading-8">{whiteBot.name}</span>
            <FaEdit className="w-4 h-4" />
          </div>
        </button>

        <button 
          type="button" 
          className="text-xl bg-green-700 border-b-4 border-green-900 p-2 rounded-md w-full mt-4"
          onClick={() => navigate("/game")}
        >
          Start Game
        </button>
      </div>
    )}

    </div>
  )
}

export default NewGamePage;
