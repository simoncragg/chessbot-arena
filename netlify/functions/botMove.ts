import { v4 as uuidv4 } from "uuid";
import { Chess } from "chess.js";

const botMove = async (request: Request) => {

  try {

    if (request.method !== "POST") {
      return buildResponse({ message: "Method Not Allowed" }, 405);
    }

    const body = await request.text();
    const { fen } = JSON.parse(body);

    if (!fen) {
      return buildResponse({ message: "Bad Request: Missing FEN notation" }, 400);
    }

    const chess = new Chess(fen);
    if (!chess) {
      return buildResponse({ message: "Bad Request: Invalid FEN notation" }, 400);
    }

    const move = await getBestMove(fen);

    return buildResponse({ move }, 200);

  } catch (error) {
    const errorId = uuidv4();
    console.error(`[Error ID: "${errorId}"]`, error.message);

    return buildResponse({ message: `Internal Server Error [Error ID: "${errorId}"]` }, 500);
  }
};

function buildResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), { status });
}

async function getBestMove(fen: string) {
  const response = await fetch(`https://stockfish.online/api/s/v2.php?fen=${fen}&depth=1`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Unsuccessful response received from Stockfish API. Error: ${result.error}`)
  }

  return result.bestmove.split(" ")[1];
}

export default botMove;
