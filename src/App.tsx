import { Chessboard } from 'react-chessboard'
import './App.css'

const App = () => {
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Checkmate Arena</h1>
      <div>
        <Chessboard id="defaultBoard" />
      </div>
      <button type="button" className="border-solid border-2 rounded-md">New Game</button>
    </div>
  )
}

export default App;
