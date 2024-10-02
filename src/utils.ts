import type { PieceMove, Player } from "./types";
import { Chess } from "chess.js";

export function isIOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
};

export function isValidPlayer(player: Player) {

  if (!player) {
    return false;
  }

  if (!player.colour) {
    return false;
  }

  if (!player.playerType) {
    return false;
  }

  if (player.playerType === "Human") {
    return player.name?.length !== 0;
  }

  return player.botId;
}

export function isValidMove(move: string | PieceMove, fen: string) {
  const game = new Chess(fen);
  try {
    const result = game.move(move);
    return result !== null;
  }
  catch (error: unknown) {
    return false;
  }
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}