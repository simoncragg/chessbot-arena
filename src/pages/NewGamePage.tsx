import type { Player } from "../types";

import React, { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PlayerForm from "../components/PlayerForm";
import PlayerStatusBar from "../components/PlayerStatusBar";
import { useGame } from "../GameContext";

const GAME_SETUP_STEP_WHITE_PLAYER = 1;
const GAME_SETUP_STEP_BLACK_PLAYER = 2;
const GAME_SETUP_STEP_SUMMARY = 3;

const NewGamePage: React.FC = () => {
  
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const { white, black, boardOrientation } = state;

  const [step, setStep] = useState<number>(GAME_SETUP_STEP_WHITE_PLAYER);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: "RESET_GAME"});
  }, [dispatch]);

  const editStep = (step: number) => {
    setIsEditMode(true);
    setStep(step);
  };

  const onEditClick = (player: Player) => {
    const step = player.colour === "White"
      ? GAME_SETUP_STEP_WHITE_PLAYER
      : GAME_SETUP_STEP_BLACK_PLAYER;

    editStep(step);
  };

  const updateState = (player: Player) => {
    if (step === GAME_SETUP_STEP_WHITE_PLAYER) {
      dispatch({ type: "SET_WHITE", payload: player });
      const nextStep = isEditMode
        ? GAME_SETUP_STEP_SUMMARY 
        : GAME_SETUP_STEP_BLACK_PLAYER;
      setStep(nextStep);
    }
    else {
      dispatch({ type: "SET_BLACK", payload: player });
      setStep(GAME_SETUP_STEP_SUMMARY);
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

      {step === GAME_SETUP_STEP_SUMMARY && (
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
