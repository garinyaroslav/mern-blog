import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostSliceState, PostData, Status } from './types';
import { fetchPosts, fetchRemovePost, fetchTags } from './asyncActions';

const initialState: PostSliceState = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получение статей
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = Status.LOADING;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostData[]>) => {
      state.posts.items = action.payload;
      state.posts.status = Status.LOADED;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = Status.ERROR;
    });
    // Получение статей
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = Status.LOADING;
    });
    builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.tags.items = action.payload;
      state.tags.status = Status.LOADED;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = Status.ERROR;
    });
    // Удаление статей
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});
export const postsReduser = postsSlice.reducer;
