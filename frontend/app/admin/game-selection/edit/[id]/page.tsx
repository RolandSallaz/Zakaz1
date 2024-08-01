"use client";
import GameSelectionForm from "@/app/components/GameSelectionForm/GameSelectionForm";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { updateGameSelection } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { loadGameSelections } from "@/app/lib/services/slices/gameSelectionSlice";
import { IGameSelectionUpdateDto } from "@/app/lib/utils/types";
import React from "react";

export default function Page() {
  const dispatch = useAppDispatch();
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
  const { handleError } = useErrorHandler();
  function handleUpdateGameSelection(dto: IGameSelectionUpdateDto) {
    updateGameSelection(dto)
      .then((updatedItem) => {
        dispatch(
          loadGameSelections(
            gameSelections.map((item) =>
              item.id == updatedItem.id ? updatedItem : item
            )
          )
        );
        dispatch(openSnackBar({ message: "Подборка успешно обновлена" }));
      })
      .catch(handleError);
  }
  return (
    <GameSelectionForm onSubmitForm={handleUpdateGameSelection} isEditing />
  );
}
