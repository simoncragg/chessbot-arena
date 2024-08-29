import { Chessboard } from 'react-chessboard'

const LandingPage = () => {
  
  return (
    <div className="flex flex-col items-center gap-8 w-5/6">
      <h1 className="font-cinzel text-4xl font-bold">Chess Bot Arena</h1>
      <div className="flex flex-col w-full md:w-96 gap-8">
        <Chessboard id="defaultBoard" />
        <button 
          type="button" 
          className="font-cinzel text-xl border-solid border-2 border-stone-300 bg-green-800 rounded-md p-2 w-full"
        >
          New Game
        </button>
      </div>
    </div>
  )
}

export default LandingPage;
