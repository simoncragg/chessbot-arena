import type { Player } from "./types";

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

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}