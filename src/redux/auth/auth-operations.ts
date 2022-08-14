import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser, IUserForm } from '../../types/stateTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials:IUserForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/signup', credentials);
      const d:IUser = data;
      token.set(d.token);
     
      return data;
    } catch ({ message }) {
      alert(message);
      return rejectWithValue(message);
    }
  }
);

const logIn = createAsyncThunk(
  'auth/login',
  async (credentials:IUserForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/login', credentials);
      const d:IUser = data;
      token.set(d.token);
      return d;
    } catch ({ message }) {
      alert(message);
      return rejectWithValue(message);
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

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state:RootState = thunkAPI.getState();

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
