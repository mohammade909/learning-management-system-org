import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../baseurl';
// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
  fees: [],
  courses: [],
  enrollments: [],
};

// Async thunk to fetch enrollment, course, fee, and parent details by child_id
export const fetchEnrollmentCourseFeeDetailsByChildId = createAsyncThunk(
  'enrollment/fetchEnrollmentCourseFeeDetailsByChildId',
  async (child_id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/enrollments/user/${child_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchEnrollmentByChildId = createAsyncThunk(
  'enrollment/fetchEnrollmentByChildId',
  async (child_id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/enrollments/student/${child_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a slice
const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEnrollmentCourseFeeDetailsByChildId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentCourseFeeDetailsByChildId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEnrollmentCourseFeeDetailsByChildId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEnrollmentByChildId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentByChildId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.fees =  action.payload.feesResults;
        state.courses=  action.payload.coursesResults;
        state.enrollments = action.payload.enrollmentsResults
      })
      .addCase(fetchEnrollmentByChildId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enrollmentSlice.reducer;
