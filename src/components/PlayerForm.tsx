import type { ChessBot, Player, PlayerType } from "../types";
import React, { useEffect } from "react";
import { GiPawn } from "react-icons/gi";
import { TbLoader2 } from "react-icons/tb";
import { useForm } from "react-hook-form";

import Button from "./Button";
import ChessBotSelector from "./ChessBotSelector";
import PlayerTypeButtonGroup from "./PlayerTypeButtonGroup";
import getBots from "../services/getBots";
import { isValidPlayer } from "../utils";
import { useGame } from "../GameContext";

interface PlayerFormProps {
  player: Player;
  submitText: string;
  onSubmit: (player: Player) => void;
}

interface FormData {
  playerType: PlayerType;
  name: string;
  botId?: string;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, submitText, onSubmit }) => {
  const { state, dispatch } = useGame();
  const { chessBots } = state;

  const formProps = {
    mode: "onSubmit" as const,
    defaultValues: {
      name: player.name,
      botId: player.botId,
      playerType: player.playerType || "Bot",
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>(formProps);

  const playerType = watch("playerType");
  const selectedBotId = watch("botId");
  const selectedBot = chessBots.find((bot) => bot.id === selectedBotId);

  useEffect(() => {
    if (chessBots.length === 0) {
      getBots((chessBots: ChessBot[]) =>
        dispatch({ type: "SET_CHESSBOTS", payload: chessBots })
      );
    }
  }, [chessBots, dispatch]);

  const onPlayerTypeSelected = (selected: PlayerType) => {
    setValue("playerType", selected);
    if (selected === "Bot") {
      setValue("name", "");
    }
    else {
      setValue("botId", undefined);
    }
  };

  const onFormSubmit = (data: FormData) => {
    const player = createPlayer(data);
    if (isValidPlayer(player)) {
      onSubmit(player);
    }
  };

  const createPlayer = (data: FormData): Player => {
    const newPlayer: Player = {
      colour: player.colour,
      playerType: data.playerType,
      name: "",
    };

    if (data.playerType === "Human") {
      return {
        ...newPlayer,
        name: data.name ?? "",
      };
    }
    else {
      const bot = chessBots.find((bot) => bot.id === data.botId);
      return {
        ...newPlayer,
        name: bot?.name ?? "",
        botId: bot?.id,
        elo: bot?.elo,
      };
    }
  };

  const pawnTextColour = player.colour === "White" ? "text-white" : "text-black";
  const pawnBgColour = player.colour === "White" ? "bg-black" : "bg-white/90";

  return (
    <div className="flex flex-col pt-8 md:pt-10 text-neutral-300 bg-neutral-800 rounded-2xl w-96 md:w-[500px]">
        
      <div className="flex flex-col items-center gap-2 w-full">
        <div className={`p-2 ${pawnBgColour} rounded-full`}>
          <GiPawn className={`w-12 md:w-14 h-12 md:h-14 ${pawnTextColour}`} />
        </div>
        <span className="font-cinzel font-semibold text-2xl">{player.colour}</span>
      </div>

      <form
        className="flex flex-col items-center mt-12 mb-6 gap-4"
        noValidate
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-5/6 md:w-2/3">

          <PlayerTypeButtonGroup selected={playerType} onPlayerTypeSelected={onPlayerTypeSelected} />

          {playerType === "Bot" && (
            <div className="flex flex-col mt-0 w-full">

              <label className="block mb-2 text-base font-medium text-white">
                Bot
              </label>

              <input
                type="hidden"
                {...register("botId", {
                  required: playerType === "Bot" ? "Bot selection is required" : false,
                })}
              />

              {chessBots.length > 0 ? (
                <ChessBotSelector
                  chessBots={chessBots}
                  selectedBot={selectedBot}
                  onChessBotSelected={(chessBot) => {
                    setValue("botId", chessBot.id);
                  }}
                />
              ) : (
                <LoadingBar />
              )}
              
              <div className="h-6 mt-2">
                {errors.botId && (
                  <p className="text-red-500 text-sm m-0 leading-tight">{errors.botId.message}</p>
                )}
              </div>
            </div>
          )}

          {playerType === "Human" && (
            <div className="w-full">
              <label htmlFor="name" className="block mb-2 text-base font-medium text-white">
                Name
              </label>
              <input
                {...register("name", {
                  required: playerType === "Human" ? "Name is required" : false,
                })}
                type="text"
                id="name"
                className="text-base rounded-lg block w-full border p-2.5 bg-neutral-700 text-white"
                placeholder="Enter your name"
              />
              
              <div className="h-6 mt-2">
                {errors.name && (
                  <p className="text-red-500 text-sm m-0 leading-tight">{errors.name.message}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-950 border-1 -mt-2 mb-2 w-full"></div>

        <Button type="submit" variant="secondary" width="w-5/6 md:w-2/3">{submitText}</Button>

      </form>
    </div>
  );
};

const LoadingBar: React.FC = () => {
  return (
    <div className="flex flex-row rounded-md border border-white px-4 py-2 gap-2 items-center justify-between">
      <span className="text-base font-semibold">Loading bots ...</span>
      <TbLoader2 className="w-6 h-6 text-white rounded-full animate-spin" />
    </div>
  );
};

export default PlayerForm;
