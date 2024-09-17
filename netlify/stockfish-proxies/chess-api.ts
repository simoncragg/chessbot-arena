import type { MoveResponse } from "../../src/types";

interface ChessApiResponse {
  san: string;
}

async function getBestMove(fen: string, depth: number): Promise<MoveResponse> {

  const requestBody = {
    fen,
    variants: 1,
    depth,
    maxThinkingTime: 100,
    searchmoves: ""
  };

  const response = await fetch("https://chess-api.com/v1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  const result: ChessApiResponse = await response.json();
  return {
    move: result["san"]
  };
}

export default getBestMove;
