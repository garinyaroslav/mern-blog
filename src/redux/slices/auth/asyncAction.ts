import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { AuthData } from '../../../Pages/Login';
import { AuthSliceData } from './types';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: AuthData) => {
  const { data } = await axios.post<AuthSliceData>('/auth/login', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get<AuthSliceData>('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: AuthData) => {
  const { data } = await axios.post<AuthSliceData>('/auth/register', params);
  return data;
});
