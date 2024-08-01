"use client";
import GameForm from "@/app/components/GameForm/GameForm";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { deleteGame, updateGame } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { loadGames } from "@/app/lib/services/slices/gameSlice";
import { IGameUpdateDto } from "@/app/lib/utils/types";
import React from "react";

export default function Page() {
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();
  function handleChangeGame(gameDto: IGameUpdateDto) {
    updateGame(gameDto)
      .then((game) => {
        const updatedArray = games.map((oldGame) =>
          game.id == oldGame.id ? game : oldGame
        );
        dispatch(loadGames(updatedArray));
        dispatch(openSnackBar({ message: "Игра успешно обновлена" }));
      })
      .catch(handleError);
  }
  function handleDeleteGame(digiId: number) {
    deleteGame(digiId)
      .then(() => {
        dispatch(openSnackBar({ message: `Игра успешно удалена` }));
        dispatch(loadGames(games.filter((item) => item.digiId !== digiId)));
      })
      .catch(handleError);
  }

  return (
    <GameForm
      onSubmit={handleChangeGame}
      isEditing
      onDelete={handleDeleteGame}
    />
  );
}
