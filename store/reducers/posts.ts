import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types/post';
import {
  fetchPosts,
  addPost,
  editPost,
  deletePost,
} from '../actions/postsActions';
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
    deletePost: (state, action: PayloadAction<{id: number}>) => {
      state.list = state.list.filter(p => p.id !== action.payload.id);
    },

    deleteAllPosts: state => {
      state.list = [];
      state.page = 1;
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
      })
      .addCase(addPost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        console.log({action: action.payload.data});
        state.list.unshift({...action.payload.data, id: postId});
        // the api always return a post id with 101
        postId++;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed to add new post';
      })
      .addCase(editPost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        editPost.fulfilled,
        (state, action: PayloadAction<{data: Partial<Post>}>) => {
          state.status = 'idle';
          state.error = null;
          const index = state.list.findIndex(
            p => p.id === action.payload.data.id,
          );
          console.log({index});
          if (index !== -1) {
            console.log({action: action.payload.data});
            state.list[index] = {...state.list[index], ...action.payload.data};
          }
        },
      )
      .addCase(editPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed updating post';
      })
      .addCase(deletePost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.list = state.list.filter(p => p.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed deleting post';
      });
  },
});
export const {deleteAllPosts} = postsSlice.actions;

export default postsSlice.reducer;
