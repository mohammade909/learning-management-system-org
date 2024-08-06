import { createAsyncThunk } from '@reduxjs/toolkit';
import {BASEURL} from '../baseurl'
// API base URL
export const fetchEnrollmentRequests = createAsyncThunk(
  'enrollmentRequests/fetchEnrollmentRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/requests`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEnrollmentRequest = createAsyncThunk(
  'enrollmentRequests/createEnrollmentRequest',
  async (newRequest, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/enrollmentRequests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEnrollmentRequestStatus = createAsyncThunk(
  'enrollmentRequests/updateEnrollmentRequestStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/enrollmentRequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEnrollmentRequest = createAsyncThunk(
  'enrollmentRequests/deleteEnrollmentRequest',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/enrollmentRequests/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveEnrollmentRequest = createAsyncThunk(
  'enrollmentRequests/approveEnrollmentRequest',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/enrollmentRequests/approve/${id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

