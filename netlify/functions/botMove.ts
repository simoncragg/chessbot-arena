import { v4 as uuidv4 } from 'uuid';
import { Chess } from "chess.js";

const botMove = async (request: Request) => {

  try {

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
    }

    const body = await new Response(request.body).text();
    const { fen } = JSON.parse(body);

    if (!fen) {
      return new Response(JSON.stringify({ message: "Bad Request: Missing FEN notation" }), { status: 400 });
    }

    const chess = new Chess(fen);

    if (!chess) {
      return new Response(JSON.stringify({ message: "Bad Request: Invalid FEN notation" }), { status: 400 });
    }

    const moves = chess.moves();
    if (moves.length === 0) {
      return new Response(JSON.stringify({ message: "No valid moves available" }), { status: 400 });
    }

    const move = moves[Math.floor(Math.random() * moves.length)];

    return new Response(JSON.stringify({ move }), { status: 200 });

  } catch (error) {
    const errorId = uuidv4();
    console.error(error.message, $`Error ID: "${errorId}"`);

    return new Response(JSON.stringify({
      message: `Internal Server Error. See logs for more details. Error ID: "${errorId}"`
    }), { status: 500 });
  }
};

export default botMove;
