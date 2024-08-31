import { Chessboard } from 'react-chessboard'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full bg-neutral-900 gap-8">

      <div className="flex justify-center bg-neutral-900 w-full">

          <div className="flex flex-col w-96 gap-8">
            <Chessboard id="defaultBoard" />
            <button 
              type="button" 
              className="font-cinzel font-semibold text-xl bg-green-700 border-b-4 border-green-900 rounded-md p-2 w-full"
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
