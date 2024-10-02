import type { ChessBot, Player, PlayerType } from "../types";
import React, { useEffect } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { GiPawn } from "react-icons/gi";
import { TbLoader2 } from "react-icons/tb";
import { useForm } from "react-hook-form";

import ChessBotSelector from "../components/ChessBotSelector";
import getBots from "../services/getBots";
import { isValidPlayer } from "../utils";
import { useGame } from "../GameContext";

interface PlayerFormProps {
  player: Player;
  submitText: string;
  onSubmit: (player: Player) => void;
}

interface FormData {
  name: string;
  botId: string;
  playerType: PlayerType;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, submitText, onSubmit }) => {
  const { state, dispatch } = useGame();
  const { chessBots } = state;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      name: player.name || "",
      botId: player.botId || "",
      playerType: player.playerType || "Bot",
    },
  });

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
    } else {
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
    <div className="flex flex-col px-4 pt-8 md:pt-10 text-neutral-300 bg-neutral-800 rounded-2xl w-96 md:w-[470px]">
        
      <div className="flex flex-col items-center gap-2 w-full">
        <div className={`p-2 ${pawnBgColour} rounded-full`}>
          <GiPawn className={`w-12 md:w-14 h-12 md:h14 ${pawnTextColour}`} />
        </div>
        <span className="font-cinzel font-semibold text-2xl">{player.colour}</span>
      </div>

      <form
        className="flex flex-col gap-4 mt-8"
        noValidate
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="flex flex-col px-4 md:px-12 gap-6 w-full">

          <div className="inline-flex items-end justify-between rounded-md w-full" role="group"
          >
            <button
              type="button"
              className={`inline-flex items-end justify-center w-full px-4 py-2 text-base font-medium text-white ${
                playerType === "Bot" ? "bg-stone-500" : "bg-neutral-800"
              } border border-gray-200 rounded-s-lg focus:z-10 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              onClick={() => {
                setValue("playerType", "Bot");
                setValue("name", "");
              }}
            >
              <div className="flex flex-col gap-1 items-center">
                <FaRobot className="w-8 md:w-9 h-8 md:w-9 mt:0 md:mt-1" />
                Bot
              </div>
            </button>

            <button
              type="button"
              className={`inline-flex items-end justify-center w-full px-4 py-2 text-base font-medium text-white ${
                playerType === "Human" ? "bg-stone-500" : "bg-neutral-800"
              } border border-gray-200 rounded-e-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              onClick={() => {
                setValue("playerType", "Human");
                setValue("botId", "");
              }}
            >
              <div className="flex flex-col gap-1.5 items-center">
                <FaUser className="w-7 md:-w-8 h-7 md:h-8 mt-0.5" />
                Human
              </div>
            </button>
          </div>

          {playerType === "Bot" && (
            <div className="flex flex-col mt-0">

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
            <div>
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

        <div className="border-t border-zinc-950 border-1 -mt-2 mb-4"></div>

        <div className="flex flex-col pb-8 px-4 md:px-12 w-full">

          <button
            type="submit"
            className="font-semibold text-xl bg-blue-700 hover:bg-blue-800 border-b-4 border-blue-900 p-2 rounded-md w-full"
          >
            {submitText}
          </button>
        </div>

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
