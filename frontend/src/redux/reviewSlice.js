// Slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getReviews,
  addReviews
} from "../actions/reviews";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  message: null,
};

const Slice = createSlice({
  name: "reviews",
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
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
  },
});

export const { clearErrors, clearMessage } = Slice.actions;

export default Slice.reducer;
