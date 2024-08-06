// userSlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
// Example asynchronous thunk to handle login
import {BASEURL} from '../baseurl'
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (values, thunkAPI) => {
    try {
      // Your asynchronous logic to authenticate user here
      const response = await fetch(`${BASEURL}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (values, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ newPassword, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("user");

      const response = await fetch(`${BASEURL}/api/v1/auth/signout`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateUser = createAsyncThunk(
  "student/updateUser",
  async (updatedData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token; // Assuming the token is stored in the auth slice of the state

      const response = await fetch(`${BASEURL}/api/v1/auth/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
