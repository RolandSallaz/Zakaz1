"use client";
import { Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import useErrorHandler from "../hooks/useErrorHandler";
import {
  checkAuth,
  getAllGames,
  getAllGameSelections,
  getAllSliders,
  getAllTags,
  getLastSales,
} from "./api";
import { closeSnackBar, login } from "./slices/appSlice";
import { loadGameSelections } from "./slices/gameSelectionSlice";
import { loadGames, loadSaledGames } from "./slices/gameSlice";
import { loadSliders } from "./slices/sliderSlice";
import { loadTags } from "./slices/tagSlice";

export default function InitialDataLoader() {
  const { snackBar } = useAppSelector((state) => state.app);

  const { handleError } = useErrorHandler();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //cache
    const cacheSaledGames = localStorage.getItem("saledGames");
    const cacheGames = localStorage.getItem("games");
    const cacheTags = localStorage.getItem("tags");
    if (cacheSaledGames) {
      dispatch(loadSaledGames(JSON.parse(cacheSaledGames)));
    }

    if (cacheGames) {
      dispatch(loadGames(JSON.parse(cacheGames)));
    }

    if (cacheTags) {
      dispatch(loadTags(JSON.parse(cacheTags)));
    }
    //api
    getAllGames()
      .then((res) => {
        localStorage.setItem("games", JSON.stringify(res));
        dispatch(loadGames(res));
      })
      .catch(handleError);
    getAllTags()
      .then((tags) => {
        localStorage.setItem("tags", JSON.stringify(tags));
        dispatch(loadTags(tags));
      })
      .catch(handleError);
    getAllSliders()
      .then((res) => dispatch(loadSliders(res)))
      .catch(handleError);
    getAllGameSelections()
      .then((res) => dispatch(loadGameSelections(res)))
      .catch(handleError);
    getLastSales()
      .then((res) => {
        localStorage.setItem("saledGames", JSON.stringify(res));
        dispatch(loadSaledGames(res));
      })
      .catch(handleError);
    checkAuth()
      .then((res) => dispatch(login(res)))
      .catch(() => {});
  }, []);
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackBar.isOpened}
        autoHideDuration={5000}
        onClose={() => dispatch(closeSnackBar())}
        message={snackBar.message}
      />
    </>
  );
}
