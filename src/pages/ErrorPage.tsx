import type { FallbackProps } from "react-error-boundary";
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import Button from "../components/Button";
import ErrorSrc from '../assets/error-min.png';
import Footer from "../components/Footer";

const ErrorPage: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleErrorDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center max-w-full gap-4 md:gap-8">

      <header className="flex flex-col justify-center items-center bg-gradient-to-b bg-zinc-950 w-full h-24">
        <a href="/" title="home">
          <h1 className="font-cinzel text-4xl font-bold item-center">Chess Bot Arena</h1>
        </a>
      </header>

      <div role="alert" className="flex flex-col items-center gap-8">
        <h1 className="text-2xl text-white">Eeh, by 'eck!</h1>
        <img src={ErrorSrc} className="rounded-lg" alt="Surprised Pawn" />
        <Button
          type="button"
          variant="tertiary"
          onClick={resetErrorBoundary}
        >
          Try again
        </Button>

        <button
          type="button"
          className="flex items-center gap-2 text-gray-300"
          onClick={toggleErrorDetails}
        >
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          {isExpanded ? "Hide Error Details" : "Show Error Details"}
        </button>

        {isExpanded && (
          <pre style={{ color: "red" }}>{error.message}</pre>
        )}
      </div>

      <Footer />

    </div>
  );
};

export default ErrorPage;
