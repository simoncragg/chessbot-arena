import React from "react";

import { Chessboard } from "react-chessboard";

const GamePage: React.FC<GamePageProps> = () => {
  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-8">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-8">
          <Chessboard id="defaultBoard" />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
