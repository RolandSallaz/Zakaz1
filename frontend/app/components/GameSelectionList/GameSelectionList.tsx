"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { deleteGameSelection } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { loadGameSelections } from "@/app/lib/services/slices/gameSelectionSlice";
import Link from "next/link";
import React from "react";

export default function GameSelectionList() {
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();
  function handleDeleteGameSelection(id: number) {
    deleteGameSelection(id)
      .then(() => {
        dispatch(
          loadGameSelections(gameSelections.filter((item) => item.id !== id))
        );
        dispatch(openSnackBar({ message: "Подборка успешно удалена" }));
      })
      .catch(handleError);
  }
  return (
    <div className="gameSelection">
      {gameSelections?.map((item) => (
        <div className="gameSelection__item" key={item.id}>
          <Link href={`/admin/game-selection/edit/${item.id}`} className="link">
            {item.name}
          </Link>
          <button
            className="gameSelection__button"
            onClick={() => handleDeleteGameSelection(item.id)}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}
