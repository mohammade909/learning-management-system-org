import { createAsyncThunk } from "@reduxjs/toolkit";
import {BASEURL} from '../baseurl'
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
     
      return data;
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await fetch(`${BASEURL}/api/v1/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
     
      return data;
    } catch (error) {
      // Handle error
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Example asynchronous thunk to get students

export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async (blog_id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/blogs/${blog_id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getblogByUser = createAsyncThunk(
  "blog/getblogByUser",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/blogs/user/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to delete student
export const deleteBlog = createAsyncThunk(
  "blog/deleteblog",
  async (blog_id, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`${BASEURL}/api/v1/blogs/${blog_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return { blog_id: blog_id, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to update student
export const updateBlog = createAsyncThunk(
  "blog/updateblog",
  async ({ blog_id, updatedData }, thunkAPI) => {
    try {
      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
      // Your asynchronous logic to update student here
      const response = await fetch(`${BASEURL}/api/v1/blogs/${blog_id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // Handle error
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
  