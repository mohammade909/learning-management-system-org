// blogSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getblogByUser
} from "../actions/blog";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  message: null,
  blog: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action.payload.blogs;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getblogByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getblogByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action.payload.blogs;
      })
      .addCase(getblogByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog= action.payload.blog;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearMessage } = blogSlice.actions;

export default blogSlice.reducer;
