import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameContextProvider } from "./GameContext";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </StrictMode>,
)
