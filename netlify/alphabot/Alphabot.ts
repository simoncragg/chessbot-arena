import type { Color } from "chess.js";
import type { MoveResponse } from "../../src/types";
import { Chess, Move } from "chess.js";

const weights = {
  p: 100,
  n: 280,
  b: 320,
  r: 479,
  q: 929,
  k: 60000,
  k_e: 60000,
};

const pst_w = {
  p: [
    [100, 100, 100, 100, 105, 100, 100, 100],
    [78, 83, 86, 73, 102, 82, 85, 90],
    [7, 29, 21, 44, 40, 31, 44, 7],
    [-17, 16, -2, 15, 14, 0, 15, -13],
    [-26, 3, 10, 9, 6, 1, 0, -23],
    [-22, 9, 5, -11, -10, -2, 3, -19],
    [-31, 8, -7, -37, -36, -14, 3, -31],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  n: [
    [-66, -53, -75, -75, -10, -55, -58, -70],
    [-3, -6, 100, -36, 4, 62, -4, -14],
    [10, 67, 1, 74, 73, 27, 62, -2],
    [24, 24, 45, 37, 33, 41, 25, 17],
    [-1, 5, 31, 21, 22, 35, 2, 0],
    [-18, 10, 13, 22, 18, 15, 11, -14],
    [-23, -15, 2, 0, 2, 0, -23, -20],
    [-74, -23, -26, -24, -19, -35, -22, -69],
  ],
  b: [
    [-59, -78, -82, -76, -23, -107, -37, -50],
    [-11, 20, 35, -42, -39, 31, 2, -22],
    [-9, 39, -32, 41, 52, -10, 28, -14],
    [25, 17, 20, 34, 26, 25, 15, 10],
    [13, 10, 17, 23, 17, 16, 0, 7],
    [14, 25, 24, 15, 8, 25, 20, 15],
    [19, 20, 11, 6, 7, 6, 20, 16],
    [-7, 2, -15, -12, -14, -15, -10, -10],
  ],
  r: [
    [35, 29, 33, 4, 37, 33, 56, 50],
    [55, 29, 56, 67, 55, 62, 34, 60],
    [19, 35, 28, 33, 45, 27, 25, 15],
    [0, 5, 16, 13, 18, -4, -9, -6],
    [-28, -35, -16, -21, -13, -29, -46, -30],
    [-42, -28, -42, -25, -25, -35, -26, -46],
    [-53, -38, -31, -26, -29, -43, -44, -53],
    [-30, -24, -18, 5, -2, -18, -31, -32],
  ],
  q: [
    [6, 1, -8, -104, 69, 24, 88, 26],
    [14, 32, 60, -10, 20, 76, 57, 24],
    [-2, 43, 32, 60, 72, 63, 43, 2],
    [1, -16, 22, 17, 25, 20, -13, -6],
    [-14, -15, -2, -5, -1, -10, -20, -22],
    [-30, -6, -13, -11, -16, -11, -16, -27],
    [-36, -18, 0, -19, -15, -15, -21, -38],
    [-39, -30, -31, -13, -31, -36, -34, -42],
  ],
  k: [
    [4, 54, 47, -99, -99, 60, 83, -62],
    [-32, 10, 55, 56, 56, 55, 10, 3],
    [-62, 12, -57, 44, -67, 28, 37, -31],
    [-55, 50, 11, -4, -19, 13, 0, -49],
    [-55, -43, -52, -28, -51, -47, -8, -50],
    [-47, -42, -43, -79, -64, -32, -29, -32],
    [-4, 3, -14, -50, -57, -18, 13, 4],
    [17, 30, -3, -14, 6, -1, 40, 18],
  ],
};

const pst_b = {
  p: pst_w["p"].slice().reverse(),
  n: pst_w["n"].slice().reverse(),
  b: pst_w["b"].slice().reverse(),
  r: pst_w["r"].slice().reverse(),
  q: pst_w["q"].slice().reverse(),
  k: pst_w["k"].slice().reverse(),
};

const pstOpponent = { w: pst_b, b: pst_w };
const pstSelf = { w: pst_w, b: pst_b };

class Alphabot {

  private game: Chess;
  private maxDepth: number;
  private timeLimitMs: number;
  private transpositionTable: Map<string, { value: number; depth: number }>;

  constructor(fen: string, maxDepth: number, timeLimitMs: number = 9500) {
    this.game = new Chess(fen);
    this.maxDepth = maxDepth;
    this.timeLimitMs = timeLimitMs;
    this.transpositionTable = new Map()
  }

  public getBestMove(): MoveResponse {
    
    const color = this.game.turn();
    const startTime = performance.now();

    let bestMove: Move | null = null;

    this.transpositionTable.clear();
    for (let maxDepth = 1; maxDepth <= this.maxDepth; maxDepth++) {

      if (this.isOutOfTime(startTime)) {
        break;
      }

      const [move,] = this.minimax(
        0,
        maxDepth,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        true,
        color,
        startTime
      );
      
      if (move) {
        bestMove = move;
      }
    }

    return {
      move: bestMove?.san ?? null
    };
  }

  private minimax(
    depth: number,
    maxDepth: number,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean,
    color: Color,
    startTime: number
  ): [Move | null, number] {
    //console.log(`Entering minimax at depth: ${depth} maxDepth: ${maxDepth}`);

    if (this.isOutOfTime(startTime)) {
      return [null, this.evaluateBoard(color)];
    }

    const fen = this.game.fen();
    const normalisedFen = this.normalizeFen(fen);
    const depthRemaining = maxDepth - depth;

    if (this.transpositionTable.has(normalisedFen)) {
      const entry = this.transpositionTable.get(normalisedFen)!;
      if (entry.depth >= depthRemaining) {
        return [null, entry.value];
      }
    }

    const moves = this.game.moves({ verbose: true });

    if (depth >= maxDepth || moves.length === 0) {
      const evaluation = this.evaluateBoard(color);
      this.transpositionTable.set(normalisedFen, { value: evaluation, depth: depthRemaining });
      return [null, evaluation];
    }

    const orderedMoves = this.orderMoves(moves);

    let safeMoves: Move[] = [];
    for (const move of orderedMoves) {
      this.game.move(move);

      if (!this.isDangerousMove(move)) {
        safeMoves.push(move);
      }

      this.game.undo();
    }

    const movesToConsider = safeMoves.length > 0 ? safeMoves : orderedMoves;

    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove: Move | null = null;
    let shouldBreak = false;

    for (const move of movesToConsider) {

      if (this.isOutOfTime(startTime)) {
        break;
      }

      this.game.move(move);

      const newDepth = depth + 1;

      const [, childValue] = this.minimax(
        newDepth,
        maxDepth,
        alpha,
        beta,
        !isMaximizingPlayer,
        color,
        startTime
      );

      this.game.undo();

      [alpha, beta, shouldBreak] = this.applyAlphaBetaPruning(
        isMaximizingPlayer,
        childValue,
        alpha,
        beta
      );

      if (isMaximizingPlayer) {
        if (childValue > maxValue) {
          maxValue = childValue;
          bestMove = move;
        }
      } else {
        if (childValue < minValue) {
          minValue = childValue;
          bestMove = move;
        }
      }

      if (shouldBreak) break;
    }

    const resultValue = isMaximizingPlayer ? maxValue : minValue;
    this.transpositionTable.set(normalisedFen, { value: resultValue, depth });

    return isMaximizingPlayer ? [bestMove, maxValue] : [bestMove, minValue];
  }

  private normalizeFen(fen: string): string {
    // Include only piece placement, active color, and castling rights.
    return fen.split(" ").slice(0, 3).join(" ");
  }

  private orderMoves(moves: Move[]): Move[] {
    return moves.sort((a, b) => this.scoreMove(b) - this.scoreMove(a));
  }

  private scoreMove(move: Move): number {
    let score = 0;
    if (move.captured) {
      score += 10 + (weights[move.captured] - weights[move.piece]);
    }
    if (move.flags.includes("p")) {
      score += 8;
    }
    this.game.move(move);
    if (this.game.inCheck()) {
      score += 5;
    }
    this.game.undo();
    return score;
  }

  private applyAlphaBetaPruning(
    isMaximizingPlayer: boolean,
    childValue: number,
    alpha: number,
    beta: number
  ): [number, number, boolean] {
    let shouldBreak = false;

    if (isMaximizingPlayer) {
      alpha = Math.max(alpha, childValue);
      if (alpha >= beta) {
        //console.log("Beta cutoff at maximizing node");
        shouldBreak = true;
      }
    } else {
      beta = Math.min(beta, childValue);
      if (alpha >= beta) {
        //console.log("Alpha cutoff at minimizing node");
        shouldBreak = true;
      }
    }

    return [alpha, beta, shouldBreak];
  }

  isDangerousMove(move: Move): boolean {
    const piece = this.game.get(move.to);
    if (!piece) {
      return false;
    }
    return this.isPieceThreatened(move.to, piece.color);
  }

  private evaluateBoard(turn: Color): number {
    let evaluation = this.evaluateStaticBoard(turn);
    evaluation += this.evaluateChecksAndOutcomes(turn);
    return evaluation;
  }

  private evaluateStaticBoard(turn: Color): number {
    let totalEvaluation = 0;
    const board = this.game.board();

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece !== null) {
          const pieceType = piece.type;
          const pieceColor = piece.color;

          const isOwnPiece = pieceColor === turn;
          const pst = isOwnPiece ? pstSelf : pstOpponent;
          const pstTable = pst[pieceColor][pieceType];
          const colorMultiplier = isOwnPiece ? 1 : -1;

          totalEvaluation +=
            colorMultiplier *
            (weights[pieceType] + pstTable[i][j]);
        }
      }
    }

    return totalEvaluation;
  }

  private evaluateChecksAndOutcomes(turn: Color): number {
    let evaluation = 0;
    
    if (this.game.isCheckmate()) {
      evaluation += this.game.turn() === turn ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    else if (this.game.isDraw() || this.game.isStalemate() || this.game.isThreefoldRepetition()) {
      evaluation += 0;
    }
    else if (this.game.inCheck()) {
      evaluation += this.game.turn() === turn ? -50 : 50;
    }

    return evaluation;
  }

  private isPieceThreatened(square: string, turn: Color): boolean {
    const opponentColor = turn === "w" ? "b" : "w";
    return this.game
      .moves({ verbose: true })
      .some(move => move.color === opponentColor && move.to === square);
  }

  private isOutOfTime(startTime: number): boolean {
    const timeElapsed = performance.now() - startTime;
    return timeElapsed >= this.timeLimitMs;
  }
}

export default Alphabot;
