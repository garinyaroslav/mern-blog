import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { PostData } from './types';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get<PostData[]>('/posts');
  return data;
});

export const fetchPostsPop = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get<PostData[]>('/posts?sort=popular');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get<string[]>('/posts/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id: string) => {
  await axios.delete(`/posts/${id}`);
});
