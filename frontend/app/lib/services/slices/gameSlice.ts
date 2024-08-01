import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGame, IGameSale } from '../../utils/types';

interface IGameSlice {
  games: IGame[];
  saledGames: IGameSale[];
  filteredGames: IGame[];
}

const initialState: IGameSlice = {
  games: [],
  saledGames: [],
  filteredGames: []
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
    },
    loadFilteredGames(state, action: PayloadAction<IGame[]>) {
      state.filteredGames = action.payload;
    }
  }
});

export const { loadGames, loadSaledGames, loadFilteredGames } = gameSlice.actions;

export default gameSlice.reducer;
