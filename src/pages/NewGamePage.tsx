import type { Player } from "../types";

import React, { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PlayerForm from "../components/PlayerForm";
import PlayerStatusBar from "../components/PlayerStatusBar";
import { useGame } from "../GameContext";

const NewGamePage: React.FC = () => {
  
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const [step, setStep] = useState<number>(1);
  const [white, setwhite] = useState<Player>({ colour: "White", playerType: "Bot", name: "" });
  const [black, setblack] = useState<Player>({ colour: "Black", playerType: "Bot", name: "" });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: "RESET_GAME"});
  }, [dispatch]);

  const editStep = (step: number) => {
    setIsEditMode(true);
    setStep(step);
  };

  const updateState = (player: Player) => {
    if (step === 1) {
      setwhite(player);
      setStep(isEditMode ? 3 : 2);
    } else {
      setblack(player);
      setStep(3);
    }
    setIsEditMode(false);
  };

  const startGame = () => {
    dispatch({ type: "SET_WHITE", payload: white });
    dispatch({ type: "SET_BLACK", payload: black });
    navigate("/game");
  }

  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-col md:flex-row gap-2 w-full">

        {[white, black].map((p, i) => (
          step === i+1 && (
            <PlayerForm 
              key={`playerForm-${i+1}`}
              player={p} 
              submitText={isEditMode ? "Update" : "Next"} 
              onSubmit={updateState} 
            />
          )
        ))}

      </div>

      {step === 3 && (
        <div className="flex flex-col w-96 gap-2 items-start">

          <PlayerStatusBar player={black} onClick={() => editStep(2)} />
          <Chessboard isDraggablePiece={() => false} />
          <PlayerStatusBar player={white} onClick={() => editStep(1)} />

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

export default NewGamePage;
