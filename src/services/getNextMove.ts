import { handleAll, retry } from "cockatiel";

interface GetNextMoveRequest {
  fen: string;
  botId: string;
}

interface GetNextMoveResult {
  move: string;
  fen: string;
}

async function getNextMove(request: GetNextMoveRequest, callback: (result: GetNextMoveResult) => void) {
  const { fen } = request;
  const retryPolicy = retry(handleAll, { maxAttempts: 2 });
  const response = await retryPolicy.execute(() => fetchMove(request));
  const result = await response.json();
  callback({ move: result.move, fen });
}

async function fetchMove(request: GetNextMoveRequest): Promise<Response> {
  return await fetch("/.netlify/functions/botMove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
}

export default getNextMove;
