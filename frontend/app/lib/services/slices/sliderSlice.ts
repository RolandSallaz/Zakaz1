import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISlider } from '../../utils/types';

interface ISliderSlice {
  sliders: ISlider[];
}

const initialState: ISliderSlice = {
  sliders: []
};

export const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    loadSliders(state, action: PayloadAction<ISlider[]>) {
      state.sliders = action.payload;
    }
  }
});

export const { loadSliders } = sliderSlice.actions;

export default sliderSlice.reducer;
