/// <reference types="vite-plugin-svgr/client" />
import { Link, useOutlet } from "react-router-dom";
import Netlify from "./assets/netlify.svg?react";

const Layout = () => {

  const outlet = useOutlet();

  return (
    <div className="flex flex-col items-center max-w-full gap-4 md:gap-8">

      <header className="flex flex-col justify-center items-center bg-gradient-to-b bg-zinc-950 w-full h-24">
        <Link to="/">
          <h1 className="font-cinzel text-4xl font-bold item-center">Chess Bot Arena</h1>
        </Link>
      </header>

      {outlet}

      <footer className="flex flex-col items-center my-8 gap-8 w-full">
        <Netlify />
        <div className="flex flex-col items-center">
          <span className="text-base text-gray-200">Released under the MIT License.</span>
          <span className="text-base text-gray-200">Copyright © 2024-Present Simon Cragg</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
