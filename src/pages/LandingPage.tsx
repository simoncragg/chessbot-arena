import { Chessboard } from 'react-chessboard'

const LandingPage = () => {
  
  return (
    <div className="flex flex-col items-center gap-8 w-5/6">
      <h1 className="text-4xl font-bold">Checkmate Arena</h1>
      <div className="flex flex-col w-full md:w-96 gap-8">
        <Chessboard id="defaultBoard" />
        <button type="button" className="border-solid border-2 rounded-md p-2 w-full">New Game</button>
      </div>
    </div>
  )
}

export default LandingPage;
