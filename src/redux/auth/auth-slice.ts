import { createSlice } from '@reduxjs/toolkit';

import { IAuth } from '../../types/stateTypes';

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
  extraReducers:(builder)=>{
    builder
      .addCase(authOperations.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(authOperations.register.rejected, (state, action) => {
        if(typeof action.payload === 'string') {
          state.error = action.payload;
        }      
         })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(authOperations.logIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
        if(typeof action.payload === 'string') {
          state.error = action.payload;
        } 
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.isFetchingCurrentUser = false;
      })
  }    
});

export default authSlice.reducer;
