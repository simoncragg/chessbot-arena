import type { MoveResponse } from "../../src/types";

import { v4 as uuidv4 } from "uuid";
import { Chess } from "chess.js";
import buildResponse from "./buildResponse";

const botMoveHandler = async (request: Request, makeMove: (botId: string, fen: string) => Promise<MoveResponse>) => {

  try {

    if (request.method !== "POST") {
      return buildResponse({ message: "Method Not Allowed" }, 405);
    }

    const body = await request.text();
    const { botId, fen } = JSON.parse(body);

    if (!fen) {
      return buildResponse({ message: "Bad Request: Missing FEN notation" }, 400);
    }

    const chess = new Chess(fen);
    if (!chess) {
      return buildResponse({ message: "Bad Request: Invalid FEN notation" }, 400);
    }

    const result = await makeMove(botId, fen);
    return buildResponse({ move: result.move }, 200);

  } catch (error) {
    const errorId = uuidv4();
    if (error instanceof Error) {
      console.error(`[Error ID: "${errorId}"]`, error.message);
    }
    return buildResponse({ message: `Internal Server Error [Error ID: "${errorId}"]` }, 500);
  }
};

export default botMoveHandler;
