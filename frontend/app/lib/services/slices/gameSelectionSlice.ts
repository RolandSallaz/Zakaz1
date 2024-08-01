import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGameSelection } from '../../utils/types';

interface IGameSlectionSlice {
  gameSelections: IGameSelection[];
}

const initialState: IGameSlectionSlice = {
  gameSelections: []
};

export const gameSelectionSlice = createSlice({
  name: 'gameSelections',
  initialState,
  reducers: {
    loadGameSelections(state, action: PayloadAction<IGameSelection[]>) {
      state.gameSelections = action.payload;
    }
  }
});

export const { loadGameSelections } = gameSelectionSlice.actions;

export default gameSelectionSlice.reducer;
