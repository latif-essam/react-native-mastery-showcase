import {createAsyncThunk} from '@reduxjs/toolkit';
import jsonApi from '../../api';
import {Post} from '../../types/post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number) => {
    const res = await jsonApi.get(`posts?_page=${page}&_limit=10`);
    return {data: res.data, page};
  },
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post: Partial<Post>) => {
    const res = await jsonApi.post('posts', post);
    return {data: res.data};
  },
);
export const editPost = createAsyncThunk(
  'posts/editPost',
  async (post: Partial<Post>) => {
    const res = await jsonApi.put(`posts/${post.id}`, post);
    return {data: res.data};
  },
);
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    try {
      await jsonApi.delete(`posts/${id}`);
      return {id};
    } catch (error) {
      return {id, error};
    }
  },
);
