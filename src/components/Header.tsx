import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col justify-center items-center bg-gradient-to-b bg-zinc-950 w-full h-24">
      <Link to="/">
        <h1 className="font-cinzel text-4xl font-bold item-center">Chess Bot Arena</h1>
      </Link>
    </header>
  );
};

export default Header;
