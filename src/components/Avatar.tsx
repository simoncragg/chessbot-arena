import type { Player } from "../types";
import React from "react";

interface AvatarProps {
  player: Player;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ player, className }) => {

  const id = player.playerType === "Bot"
    ? player.botId
    : "anonymous-human";

  return (
    <img 
      src={`${import.meta.env.VITE_PUBLIC_URL}/avatars/${id}-min.jpg`} 
      alt={`${player.name || ""} avatar`}
      className={className}
    />
  );
};

export default Avatar;
