import { useNavigate } from 'react-router-dom';

const NewGamePage = () => {
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-cinzel text-4xl font-bold">Chess Bot Arena</h1>

      <div className="flex flex-row gap-8">

        <div className="flex flex-col border-2 p-8 w-full md:w-96 gap-8 rounded-md">

          <div className="flex w-full justify-center">
            <span className="font-cinzel text-xl">Player 1</span>
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name" className="text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">URL</label>
            <input type="text" id="url" className="text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
          </div>

          <button 
              type="button" 
              className="text-xl border-solid border-2 border-stone-300 bg-green-800 rounded-md p-2 w-full"
              onClick={() => navigate("new-game")}
            >
              Test Connection
          </button>
        </div>

        <div className="font-cinzel font-bold text-2xl self-center bg-neutral-500 p-2 rounded-full">
          vs
        </div>

        <div className="flex flex-col border-2 p-8 w-full md:w-96 gap-8 rounded-md">

          <div className="flex w-full justify-center">
            <span className="font-cinzel text-xl">Player 2</span>
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name" className="text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">URL</label>
            <input type="text" id="url" className="text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
          </div>

          <button 
              type="button" 
              className="text-xl border-solid border-2 border-stone-300 bg-green-800 rounded-md p-2 w-full"
              onClick={() => navigate("new-game")}
            >
              Test Connection
          </button>
        </div>

      </div>
    </div>
  )
}

export default NewGamePage;
