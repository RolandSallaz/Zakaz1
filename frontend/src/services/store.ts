import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import gameSlice from './slices/gameSlice';

export const rootReducer = combineReducers({
  app: appReducer,
  games: gameSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
