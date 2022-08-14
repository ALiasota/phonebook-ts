import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuth } from '../../types/stateTypes';
import type { RootState } from '../store';
import authOperations from './auth-operations';



const initialState: IAuth = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers:
   {
    [authOperations.register.fulfilled](state: RootState, action: PayloadAction<IAuth>):void {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [authOperations.register.rejected](state: RootState, action: PayloadAction<IAuth>) {
      state.error = action.payload;
    },
    [authOperations.logIn.fulfilled](state: RootState, action: PayloadAction<IAuth>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [authOperations.logIn.rejected](state: RootState, action: PayloadAction<IAuth>) {
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload;
    },
    [authOperations.logOut.fulfilled](state: RootState) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.pending](state: RootState) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state: RootState, action: PayloadAction<IAuth>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state: RootState) {
      state.isLoggedIn = false;
      state.token = null;
      state.isFetchingCurrentUser = false;
    },
  },
});

export default authSlice.reducer;
