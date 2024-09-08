import type { ChessBot } from "../types";

async function getBots(callback: (chessBots: ChessBot[]) => void) {

  const response = await fetch("/.netlify/functions/getBots", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  const chessBots = await response.json();
  callback(chessBots);
}

export default getBots;
