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

      <div className="flex flex-col md:flex-row gap-2 w-full">

        {step === 1 && (
          <PlayerForm player={white} submitText="Next" onSubmit={updateState} />
        )}

        {step === 2 && (
          <PlayerForm player={black} submitText="Next" onSubmit={updateState} />
        )}

      </div>

      {step === 3 && (
        <div className="flex flex-col w-96 gap-2 items-start">

          <PlayerReviewBar player={black} onClick={() => setStep(2)} />
          <Chessboard isDraggablePiece={() => false} />
          <PlayerReviewBar player={white} onClick={() => setStep(1)} />

          <button 
            type="button" 
            className="text-xl bg-green-700 border-b-4 border-green-900 p-2 rounded-md w-full mt-1"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
    )}

    </div>
  );
}

interface PlayerReviewBarProps {
  player: Player,
  onClick: () => void
}

const PlayerReviewBar: React.FC<PlayerReviewBarProps> = ({ player, onClick }) => {

  return (
      <div className="flex flex-row items-start justify-between gap-1 w-full">

        <div className="flex flex-row items-start gap-2 bg-neutral-800 w-full">
          <img src={`/avatars/${player.botId}-min.jpg`} alt={`${player.name || ""} avatar`} width="48" />
          <div className="flex flex-col items-start">
            <span className="text-lg leading-0">{player?.name}</span>
            {player.elo && (
              <span className="text-sm font-light">{player.elo} elo</span>
            )}
          </div>
        </div>

        <div className="bg-neutral-800">
          <button 
            type="button" 
            className="p-3"
            onClick={onClick}
          >
            <FaEdit className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
  );
}

export default NewGamePage;
