import { ErrorBoundary } from "react-error-boundary";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { GameContextProvider } from "./GameContext";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => 
      <ErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />
    }>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
