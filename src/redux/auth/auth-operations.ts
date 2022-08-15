import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserForm, IAuth } from '../../types/stateTypes';


axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk<IAuth, IUserForm, {rejectValue: string}>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/signup', credentials);
      if(data.token) {
        token.set(data.token);
      }           
      return data;
    } catch ({ message }) {
      if(typeof message === 'string' ) {
        alert(message);
      return rejectWithValue(message);
      }      
    }
  }
);

const logIn = createAsyncThunk<IAuth, IUserForm, {rejectValue: string}>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/login', credentials);
      if(data.token) {
        token.set(data.token);
      }      
      return data;
    } catch ({ message }) {
      if(typeof message === 'string') {
        alert(message);
        return rejectWithValue(message);
      }  
    }
  }
);

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('users/logout');
    token.unset();
  } catch {
    console.error();
    alert('Something is wrong, please try again');
  }
});

const fetchCurrentUser = createAsyncThunk<{name:string, email:string}, undefined, { state: RootState}>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      console.log('No user');
      return thunkAPI.rejectWithValue('');
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch {
      token.unset();
      console.error();
    } 
      
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
