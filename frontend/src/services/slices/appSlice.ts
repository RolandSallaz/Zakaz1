import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnackbar, IUser, ROLES } from '../../utils/types';

interface IAppState {
  loggedIn: boolean;
  loading: boolean;
  user: IUser;
  snackBar: ISnackbar;
}

const initialState: IAppState = {
  loggedIn: false,
  loading: false,
  user: {
    email: '',
    role: ROLES.USER,
    id: 0,
    orders: []
  },
  snackBar: {
    isOpened: false,
    message: ''
  }
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logOut(state) {
      state.loggedIn = initialState.loggedIn;
      state.user = initialState.user;
    },
    fetching(state) {
      state.loading = true;
    },
    openSnackBar(state, action: PayloadAction<{ message: string; isError?: boolean }>) {
      state.snackBar = {
        message: action.payload.message,
        isOpened: true,
        isError: (action.payload.isError = false)
      };
    },
    closeSnackBar(state) {
      state.snackBar = initialState.snackBar;
    }
  }
});
export const { login, fetching, openSnackBar, closeSnackBar, logOut } = appSlice.actions;

export default appSlice.reducer;
