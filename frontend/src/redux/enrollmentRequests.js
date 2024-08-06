import { createSlice } from '@reduxjs/toolkit';

const enrollmentRequestsSlice = createSlice({
  name: 'enrollmentRequests',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollmentRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnrollmentRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEnrollmentRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createEnrollmentRequest.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEnrollmentRequestStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEnrollmentRequest.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(approveEnrollmentRequest.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(approveEnrollmentRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default enrollmentRequestsSlice.reducer;
 