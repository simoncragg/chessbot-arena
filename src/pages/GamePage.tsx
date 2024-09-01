import { Chessboard } from "react-chessboard";
import { useGame } from "../GameContext";

const GamePage = () => {

  const { state } = useGame();

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-8">
      <div className="flex justify-center bg-neutral-900 w-full">
        <div className="flex flex-col w-96 gap-8 items-center">
          <span className="text-2xl">{ state.blackBot.name }</span>
          <Chessboard id="defaultBoard" />
          <span className="text-2xl">{ state.whiteBot.name }</span>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
