/// <reference types="vite-plugin-svgr/client" />
import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";
import Netlify from "../assets/netlify.svg?react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center my-8 gap-8 w-full">

      <a href="https://netlify.com" title="Deploys by Netlify" target="_blank">
        <Netlify />
      </a>

      <div className="flex flex-col items-center gap-4 text-gray-500">

        <div className="flex flex-col items-center">
          <span className="text-base">Copyright © 2024-Present Simon Cragg</span>
          <span className="text-base">Released under the MIT License.</span>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/simoncragg/chessbot-arena"
            title="Github Repository"
            className="hover:text-gray-200 hover:drop-shadow-[0px_0px_8px_#7dd3fc]"
            target="_blank"
          >
            <FaGithub className="w-5 h-5" />
          </a>

          <a
            href="https://netlify.com"
            target="_blank"
            className="hover:text-gray-200 hover:drop-shadow-[0px_0px_10px_#7dd3fc]"
            title="Netlify"
          >
            <SiNetlify className="w-5 h-5 scale-110" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
