interface GetNextMoveResult {
  move: string;
  fen: string;
}

async function getNextMove(args: { fen: string; botId: string }, callback: (result: GetNextMoveResult) => void) {
  const { fen, botId } = args;
  const response = await fetch("/.netlify/functions/botMove", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fen, botId }),
  });

  const result = await response.json();
  callback({ move: result.move, fen });
}

export default getNextMove;
