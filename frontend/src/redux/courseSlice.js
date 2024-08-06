// courseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getCourses,
  addCourse,
  getcourseById,
  updatecourse,
  deleteCourse,
} from "../actions/course";

const initialState = {
  courses: [],
  loading: false,
  error: null,
  message: null,
  course: null,
};

const courseSlice = createSlice({
  name: "course",
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
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getcourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getcourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.course = action.payload;
      })
      .addCase(getcourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatecourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatecourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updatecourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearMessage } = courseSlice.actions;

export default courseSlice.reducer;
