import { createAsyncThunk } from "@reduxjs/toolkit";
import {BASEURL} from '../baseurl'
export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/courses`, {
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

export const addCourse = createAsyncThunk(
  "staff/addCourse",
  async (values, thunkAPI) => {
    try {
      // Create a FormData object to hold the form values and file
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await fetch(`${BASEURL}/api/v1/courses`, {
        method: "POST",
        // Do not set Content-Type to application/json when using FormData
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

export const getcourseById = createAsyncThunk(
  "course/getCourseById",
  async (course_id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/courses/${course_id}`);

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
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (course_id, thunkAPI) => {
    console.log(course_id);
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`${BASEURL}/api/v1/courses/${course_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return { course_id: course_id, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to update student
export const updatecourse = createAsyncThunk(
  "course/updateCourse",
  async ({ course_id, updatedData }, thunkAPI) => {
    try {
      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
      // Your asynchronous logic to update student here
      const response = await fetch(`${BASEURL}/api/v1/courses/${course_id}`, {
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
  