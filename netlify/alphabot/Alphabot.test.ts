import type { MoveResponse } from "../../src/types";

import { describe, expect, test } from "vitest";
import Alphabot from "./Alphabot.ts";

describe("Alphabot chess bot", () => {

  const maxDepth = 3;

  test("white plays a strong opening move", () => {
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const result = getBestMove(fen, maxDepth);
    expect(["e4", "d4", "Nf3", "c4"]).toContain(result.move);
  });

  test("black responds strongly to white's e4 opening", () => {
    const fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1";
    const result = getBestMove(fen, maxDepth);
    expect(["Nf6", "c5", "e5", "d6"]).toContain(result.move);
  });

  test("white evades an attacking black pawn", () => {
    // Black pawn on g5 is attacking white rook on f4.
    const fen = "4k3/8/8/6p1/5R2/8/8/4K3 w - - 0 1";
    const result = getBestMove(fen, maxDepth);
    expect(["Rf3", "Rf5", "Rg4"]).toContain(result.move);
  });

  test("white captures a black pawn and forks black's king and rook with check", () => {
    // White knight on e5, black pawn on g6. Black king on f8 and black rook on h8.
    const fen = "rn1q1k1r/pp2p3/4b1pb/2ppN3/3P4/2NB4/PPP2PPP/R2QK2R w KQ c6 0 10";
    const result = getBestMove(fen, maxDepth);
    expect(result.move).toBe("Nxg6+")
  });

  test("white safely promotes pawn to a queen", () => {
    // White pawn on f7, ready to promote. White king on g7, black king on c7.
    const fen = "8/2k2PK1/8/8/8/8/8/8 w - - 0 1";
    const result = getBestMove(fen, maxDepth);
    expect(result.move).toBe("f8=Q")
  });

  test("white delivers checkmate by capturing bishop with queen", () => {
    // White queen on h8, white knight on e5. Black king on e6, black bishop on h6.
    const fen = "rnbq3Q/pp2p3/4k2b/2ppN3/3P4/2NB4/PPP2PPP/R3K2R w KQ - 3 15";
    const result = getBestMove(fen, maxDepth);
    // White queen takes bishop on h6 and checkmates king.
    expect(result.move).toBe("Qxh6#")
  });

  const getBestMove = (fen: string, maxDepth: number): MoveResponse => {
    const alphabot = new Alphabot(fen, maxDepth, 20000);
    return alphabot.getBestMove();
  };
});
