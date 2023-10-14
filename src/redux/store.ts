import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { postsReduser } from './slices/posts/slice';
import { authReducer } from './slices/auth/slice';

export const store = configureStore({
  reducer: {
    posts: postsReduser,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
