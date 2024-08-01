"use client";
import GameSelectionForm from "@/app/components/GameSelectionForm/GameSelectionForm";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { addGameSelection } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { loadGameSelections } from "@/app/lib/services/slices/gameSelectionSlice";
import { IGameSelectionDto } from "@/app/lib/utils/types";

export default function Page() {
  const dispatch = useAppDispatch();
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
  const { handleError } = useErrorHandler();
  function handleAddGameSelection(dto: IGameSelectionDto) {
    addGameSelection(dto)
      .then((newItem) => {
        dispatch(loadGameSelections([...gameSelections, newItem]));
        dispatch(openSnackBar({ message: "Подборка успешно добавлена" }));
      })
      .catch(handleError);
  }

  return <GameSelectionForm onSubmitForm={handleAddGameSelection} />;
}
