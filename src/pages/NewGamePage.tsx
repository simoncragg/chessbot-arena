import type { Player } from "../types";

import { Chessboard } from 'react-chessboard'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import PlayerForm from '../components/PlayerForm';
import { useGame } from "../GameContext";

const NewGamePage = () => {
  
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const [step, setStep] = useState<number>(1);
  const [white, setwhite] = useState<Player>({ colour: "White", playerType: "Bot", name: "" });
  const [black, setblack] = useState<Player>({ colour: "Black", playerType: "Bot", name: "" });

  const updateState = (player: Player) => {
    if (step === 1) {
      setwhite(player);
      setStep(2);
    } else {
      setblack(player);
      setStep(3);
    }
  };

  const startGame = () => {
    dispatch({ type: "SET_WHITE", payload: white });
    dispatch({ type: "SET_BLACK", payload: black });
    navigate("/game");
  }

  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-col md:flex-row gap-4 w-full">

        {step === 1 && (
          <PlayerForm player={white} submitText="Next" onSubmit={updateState} />
        )}

        {step === 2 && (
          <PlayerForm player={black} submitText="Next" onSubmit={updateState} />
        )}

      </div>

      {step === 3 && (
        <div className="flex flex-col w-96 gap-4 items-center">

          <EditPlayerButton name={black.name ?? ""} onClick={() => setStep(2)} />
          <Chessboard id="defaultBoard" />
          <EditPlayerButton name={white.name ?? ""} onClick={() => setStep(1)} />

          <button 
            type="button" 
            className="text-xl bg-green-700 border-b-4 border-green-900 p-2 rounded-md w-full mt-4"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
    )}

    </div>
  );
}

interface EditPlayerButtonProps {
  name: string,
  onClick: () => void
}

const EditPlayerButton: React.FC<EditPlayerButtonProps> = ({ name, onClick }) => {
  return (
    <button 
      type="button" 
      className="text-xl text-white border border-neutral-500 rounded-full px-4"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-2">
        <span className="leading-8">{name}</span>
        <FaEdit className="w-4 h-4" />
      </div>
    </button>
  );
}

export default NewGamePage;
