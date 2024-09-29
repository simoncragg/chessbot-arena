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
  const { state, dispatch } = useGame();
  const { white, black, boardOrientation } = state;

  const [step, setStep] = useState<number>(1);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: "RESET_GAME"});
  }, [dispatch]);

  const editStep = (step: number) => {
    setIsEditMode(true);
    setStep(step);
  };

  const onEditClick = (player: Player) => {
    const step = player.colour === "White" ? 1 : 2;
    editStep(step);
  };

  const updateState = (player: Player) => {
    if (step === 1) {
      dispatch({ type: "SET_WHITE", payload: player });
      setStep(isEditMode ? 3 : 2);
    } else {
      dispatch({ type: "SET_BLACK", payload: player });
      setStep(3);
    }
    setIsEditMode(false);
  };

  const startGame = () => {
    navigate("/game");
  };

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

          {boardOrientation === "white"
            ? <PlayerStatusBar player={black} onEditClick={() => onEditClick(black)} />
            : <PlayerStatusBar player={white} onEditClick={() => onEditClick(white)} />
          }
          
          <Chessboard boardOrientation={boardOrientation} isDraggablePiece={() => false} />

          {boardOrientation === "white"
            ? <PlayerStatusBar player={white} onEditClick={() => onEditClick(white)} />
            : <PlayerStatusBar player={black} onEditClick={() => onEditClick(black)} />
          }

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
