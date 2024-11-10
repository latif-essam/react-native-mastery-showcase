import {createAsyncThunk} from '@reduxjs/toolkit';
import jsonApi from '../../api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number) => {
    const res = await jsonApi.get(`posts?_page=${page}&_limit=10`);
    return {data: res.data, page};
  },
);
