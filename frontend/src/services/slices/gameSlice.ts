import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGame, IGameSale } from '../../utils/types';

interface IGameSlice {
  games: IGame[];
  saledGames: IGameSale[];
}

const initialState: IGameSlice = {
  games: [],
  saledGames: []
};

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    loadGames(state, action: PayloadAction<IGame[]>) {
      state.games = action.payload;
    },
    loadSaledGames(state, action: PayloadAction<IGameSale[]>) {
      state.saledGames = action.payload;
    }
  }
});

export const { loadGames, loadSaledGames } = gameSlice.actions;

export default gameSlice.reducer;
