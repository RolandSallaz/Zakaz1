import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITag } from '../../utils/types';

interface ITagSlice {
  tags: ITag[];
}

const initialState: ITagSlice = {
  tags: []
};

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    loadTags(state, action: PayloadAction<ITag[]>) {
      state.tags = action.payload;
    }
  }
});

export const { loadTags } = tagSlice.actions;

export default tagSlice.reducer;
