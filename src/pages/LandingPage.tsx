import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-6 mt-4 md:mt-4">

      <div className="flex justify-center bg-neutral-900 w-full">

          <div className="flex flex-col w-96 gap-8">
            <Chessboard isDraggablePiece={() => false} />
            <button 
              type="button" 
              className="font-cinzel font-semibold text-xl bg-green-700 hover:bg-green-800 border-b-4 border-green-900 rounded-md p-2 w-full"
              onClick={() => navigate("/new-game")}
            >
              New Game
            </button>
          </div>
        </div>
    </div>
  )
}

export default LandingPage;
