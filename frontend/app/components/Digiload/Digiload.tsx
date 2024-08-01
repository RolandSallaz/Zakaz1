"use client";
import React from "react";
import "./Digiload.scss";
import { loadGamesFromDigi, updateAllGames } from "@/app/lib/services/api";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { loadGames } from "@/app/lib/services/slices/gameSlice";
export default function Digiload() {
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();
  const { games } = useAppSelector((state) => state.games);
  function handleLoadGamesFromDigi() {
    loadGamesFromDigi()
      .then((res) => {
        dispatch(
          openSnackBar({ message: `Добавлено ${res.length} новых игр` })
        );
        dispatch(loadGames([...games, ...res]));
      })
      .catch(handleError);
  }
  function handleUpdateAllGames() {
    const startTime = performance.now();
    updateAllGames()
      .then((res) => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        dispatch(
          openSnackBar({
            message: `Прошло времени ${duration.toFixed(
              2
            )} секунд. Игр успешно обновлено ${res.games.length}. ${
              res.errorUpdates.length
                ? "Игр обновлено с ошибкой " +
                  res.errorUpdates.map((game) => game.name).join(", ")
                : ""
            }`,
          })
        );
        dispatch(loadGames([...res.games, ...res.errorUpdates]));
      })
      .catch(handleError);
  }

  return (
    <div className="digiload">
      <h2 className="digiload__heading">
        Подгрузить все игры, у которых в описании присутствует ссылка на steam
      </h2>
      <div className="digiload__container">
        <button onClick={handleLoadGamesFromDigi} className="digiload__button">
          Подгрузить новые игры
        </button>
        <button onClick={handleUpdateAllGames} className="digiload__button">
          Обновить все игры
        </button>
      </div>
    </div>
  );
}
