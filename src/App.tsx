import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamePage from "./pages/GamePage";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout";
import NewGamePage from "./pages/NewGamePage";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new-game" element={<NewGamePage />} />
          <Route path="/game" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
