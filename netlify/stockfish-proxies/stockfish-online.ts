async function getBestMove(fen: string, depth: number) {

  const response = await fetch(`https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Unsuccessful response received from Stockfish Online endpoint. Error: ${result.error}`)
  }

  return result.bestmove.split(" ")[1];
}

export default getBestMove;
