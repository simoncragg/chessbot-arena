async function getNextMove(args: { fen: string; botId: string }, callback: (move: string) => void) {
  const { fen, botId } = args;
  const response = await fetch("/.netlify/functions/botMove", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fen, botId }),
  });

  const result = await response.json();
  const { move } = result;
  callback(move);
}

export default getNextMove;
