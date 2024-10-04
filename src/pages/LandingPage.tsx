import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const LandingPage = () => {
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-6 mt-4 md:mt-4">

      <div className="flex justify-center bg-neutral-900 w-full">

          <div className="flex flex-col w-96 gap-8">
            <Chessboard isDraggablePiece={() => false} />
            <Button 
              type="button" 
              variant="primary" 
              width="w-full"
              onClick={() => navigate("/new-game")}
            >
              <span className="font-cinzel">New Game</span>
            </Button>
          </div>
        </div>
    </div>
  )
}

export default LandingPage;
