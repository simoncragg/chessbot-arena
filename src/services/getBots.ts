import type { ChessBot } from "../types";
import { handleAll, retry } from "cockatiel";

async function getBots(callback: (chessBots: ChessBot[]) => void) {
  const retryPolicy = retry(handleAll, { maxAttempts: 2 });
  const response = await retryPolicy.execute(() => fetchBots());
  const chessBots = await response.json();
  callback(chessBots);
}

async function fetchBots() {
  return await fetch("/.netlify/functions/getBots", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export default getBots;
