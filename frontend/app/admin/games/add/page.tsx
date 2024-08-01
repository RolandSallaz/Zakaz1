"use client";
import GameForm from "@/app/components/GameForm/GameForm";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { postGame } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { loadGames } from "@/app/lib/services/slices/gameSlice";
import { IGameCreateDto } from "@/app/lib/utils/types";
import React from "react";

export default function Page() {
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();
  function handleAddGame(gameDto: IGameCreateDto) {
    postGame(gameDto)
      .then((game) => {
        dispatch(loadGames([...games, game]));
        dispatch(openSnackBar({ message: "Игра успешно добавлена" }));
      })
      .catch(handleError);
  }
  return <GameForm onSubmit={handleAddGame} />;
}
