import {  createAsyncThunk } from '@reduxjs/toolkit';
import  {BASEURL} from '../baseurl'
export const getAllAttendances = createAsyncThunk(
    'attendance/getAllAttendances',
    async (_, thunkAPI) => {
      try {
        const response = await fetch(`${BASEURL}/api/v1/users/attendance/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
  
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
  // Async thunk to mark attendance
  export const markAttendance = createAsyncThunk(
    'attendance/markAttendance',
    async (attendanceData, thunkAPI) => {
      try {
        const response = await fetch(`${BASEURL}/api/v1/users/attendance/mark`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attendanceData),
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