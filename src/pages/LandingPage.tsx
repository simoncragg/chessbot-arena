import { Chessboard } from 'react-chessboard'

const LandingPage = () => {
  
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-col w-96 items-center gap-8">
        <h1 className="text-4xl font-bold">Checkmate Arena</h1>
        <Chessboard id="defaultBoard" />
        <button type="button" className="border-solid border-2 rounded-md p-2">New Game</button>
      </div>
    </div>
  )
}

export default LandingPage;
