import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGame } from '../../utils/types';

interface IGameSlice {
  games: IGame[];
}

const initialState: IGameSlice = {
  games: []
};

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    loadGames(state, action: PayloadAction<IGame[]>) {
      state.games = action.payload;
    }
  }
});

export const { loadGames } = gameSlice.actions;

export default gameSlice.reducer;
