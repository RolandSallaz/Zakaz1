import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import gameSlice from './slices/gameSlice';
import tagSlice from './slices/tagSlice';
import sliderSlice from './slices/sliderSlice';

export const rootReducer = combineReducers({
  app: appSlice,
  games: gameSlice,
  tags: tagSlice,
  sliders: sliderSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
