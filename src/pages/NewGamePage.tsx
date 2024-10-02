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
    <div className="flex flex-col items-center w-full">

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

      {step === GAME_SETUP_STEP_SUMMARY && (
        <div className="flex flex-col items-center pt-6 md:pt-0 px-2 md:px-4 gap-3 bg-neutral-800 rounded-md md:rounded-2xl w-96 md:w-[500px]">

          <div className="flex flex-col w-full md:w-5/6 items-start gap-2">

            <div className="px-2 -mt-2 md:mt-6 w-full">
              {boardOrientation === "white"
                ? <PlayerStatusBar player={black} onEditClick={() => onEditClick(black)} />
                : <PlayerStatusBar player={white} onEditClick={() => onEditClick(white)} />
              }
            </div>
            
            <Chessboard boardOrientation={boardOrientation} isDraggablePiece={() => false} />

            <div className="px-2 w-full">
              {boardOrientation === "white"
                ? <PlayerStatusBar player={white} onEditClick={() => onEditClick(white)} />
                : <PlayerStatusBar player={black} onEditClick={() => onEditClick(black)} />
              }
            </div>

          </div>

          <div className="border-t border-zinc-950 border-1 w-full"></div>

          <button 
            type="button" 
            className="px-8 py-2 mt-0 md:mt-3 mb-3 md:mb-6 text-xl bg-green-700 hover:bg-green-800 border-b-4 border-green-900 rounded-md w-full md:w-5/6"
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
