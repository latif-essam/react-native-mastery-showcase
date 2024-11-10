import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types/post';
import {fetchPosts} from '../actions/postsActions';

interface PostsState {
  list: Post[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  page: number;
  totalPages: number;
}
const initialState: PostsState = {
  list: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 10,
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.list.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<{id: number}>) => {
      state.list = state.list.filter(p => p.id !== action.payload.id);
    },
    editPost: (state, action: PayloadAction<Partial<Post>>) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = {...state.list[index], ...action.payload};
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<{data: Post[]; page: number}>) => {
          state.status = 'idle';
          if (action.payload.page === 1) {
            state.list = action.payload.data;
          } else {
            state.list = [...state.list, ...action.payload.data];
          }
          state.page = action.payload.page;
        },
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed to fetch posts';
      });
  },
});
export const {addPost, deletePost, editPost} = postsSlice.actions;

export default postsSlice.reducer;
