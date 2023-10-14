import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../posts/types';
import { fetchAuth, fetchAuthMe, fetchRegister } from './asyncAction';
import { AuthSliceState, AuthSliceData } from './types';

const initialState: AuthSliceState = {
  data: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action: PayloadAction<AuthSliceData>) => {
      state.data = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = null;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<AuthSliceData>) => {
      state.data = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action: PayloadAction<AuthSliceData>) => {
      state.data = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
