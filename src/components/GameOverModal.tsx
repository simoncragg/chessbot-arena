import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import React, { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useSpring, animated } from "@react-spring/web";

import Avatar from "./Avatar";
import Button from "./Button";
import { useGame } from "../GameContext";

interface GameOverModalProps {
  onRematch: () => void;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ onRematch, onClose }) => {

  const { state } = useGame();
  const { white, black, isDraw, drawReason, activePlayer } = state;

  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isRematchRequested, setIsRematchRequested] = useState<boolean>(false);
  
  const stopConfettiFnRef = useRef<() => void>(() => null);

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(200px)" },
    to: { opacity: isClosing ? 0 : 1, transform: isClosing ? "translateY(200px)" : "translateY(0px)" },
    config: { tension: 300, friction: 15, mass: 1 },
    delay: isClosing ? 300 : 0,

    onRest: () => {
      if (isClosing) {
        if (isRematchRequested) {
          onRematch();
        }
        stopConfettiFnRef.current();
        onClose();
      }
    },
  });
  
  const initConfetti = (params: { conductor: { stop: () => void }}) => {
    const conductor = params.conductor;
    stopConfettiFnRef.current = conductor.stop;
  };

  const handleRematch = () => {
    setIsRematchRequested (true);
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  return (
    <>
      {!isDraw && <Fireworks autorun={{ speed: 3, duration: 5000 }} onInit={(confetti) => initConfetti(confetti) } />}

      <div
        role="dialog"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72"
      >
        <animated.div
          style={springProps}
          className="relative flex flex-col p-8 items-center justify-center backdrop-blur-xl bg-neutral-950/75 rounded-lg"
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white p-1 rounded hover:bg-neutral-700"
            aria-label="Close"
          >
            <MdClose size={24} />
          </button>

          {isDraw ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-2 items-center justify-center">
                <Avatar player={white} className="w-16 h-16 rounded-md mx-auto mb-4" />
                <span className="text-xl font-bold">VS</span>
                <Avatar player={black} className="w-16 h-16 rounded-md mx-auto mb-4" />
              </div>
              <p className="text-4xl font-bold bg-gradient-to-b from-gray-100 to-gray-600 text-transparent bg-clip-text mb-1">DRAW</p>
              <p className="text-white mb-6">by {drawReason}</p>
            </div>
          ) : (
            <>
              <Avatar player={activePlayer} className="w-24 h-24 rounded-md mx-auto mb-4" />
              <p className="text-2xl font-semibold text-white mb-2">{activePlayer.name}</p>
              <p className="text-2xl font-bold bg-gradient-to-b from-yellow-100 to-yellow-600 text-transparent bg-clip-text mb-1">WINS!</p>
              <p className="text-white mb-6">by Checkmate</p>
            </>
          )}

          <Button 
            type="button" 
            variant="primary"
            width="w-full" 
            onClick={handleRematch}
          >
            Rematch
          </Button>

        </animated.div>
      </div>
    </>
  );
};

export default GameOverModal;
