import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types/post';
import {fetchPosts} from '../actions/postsActions';
let postId = 101;
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
console.log({postId});
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Partial<Post>>) => {
      state.list.unshift({...action.payload, id: postId} as Post);
      postId++;
    },
    deletePost: (state, action: PayloadAction<{id: number}>) => {
      state.list = state.list.filter(p => p.id !== action.payload.id);
    },
    editPost: (state, action: PayloadAction<Partial<Post>>) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      console.log({index});
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
          const {data, page} = action.payload;

          // Ensure that the posts being added are not duplicates
          const newPosts = data.filter(
            (post: Post) =>
              !state.list.some(existingPost => existingPost.id === post.id),
          );

          state.list = [...state.list, ...newPosts]; // Merge old and new posts
          state.page = page;
          state.totalPages = state.totalPages;
          state.status = 'idle';
          state.error = null;
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
