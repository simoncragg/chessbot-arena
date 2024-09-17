import type { MoveResponse } from "../../src/types";

import botMoveHandler from "../utils/botMoveHandler";
import getBestMove from "../stockfish-proxies/chess-api";

const botMove = async (request: Request) => {

  return botMoveHandler(request, async (botId: string, fen: string): Promise<MoveResponse> => {
    const depth = getBotDepth(botId);
    return await getBestMove(fen, depth);
  });
};

function getBotDepth(botId: string): number {
  switch (botId) {
    case "1425583c-b8de-4551-aa44-1f259f83f3d1": return 2;
    case "224e86a1-6898-4389-9de2-edf5fe0a1715": return 5;
    case "3afc6505-f882-453e-b81e-0f52d2b37c03": return 8;
    case "4a2e5e0c-f5e8-4f9d-9d13-885ea7826370": return 12;
    case "550365e9-8e4b-42ff-ab9a-2659bd909548": return 15;
    default: return 2;
  }
}

export default botMove;
