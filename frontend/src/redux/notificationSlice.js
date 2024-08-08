import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../baseurl';

// Define initial state
const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

// Create an async thunk for creating a notification
export const createNotification = createAsyncThunk(
  'notifications/createNotification',
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/notifications`, notificationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk for fetching all notifications
export const getAllNotifications = createAsyncThunk(
  'notifications/getAllNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/notifications`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create an async thunk for fetching notifications by user ID
export const getNotificationsByUser = createAsyncThunk(
  'notifications/getNotificationsByUserId',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/user-notifications/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
       console.log(data);
       
      return data;
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Create an async thunk for updating a notification
export const updateNotification = createAsyncThunk(
  'notifications/updateNotification',
  async ({ id, notificationData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Create an async thunk for deleting a notification
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/notifications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Create a notifications slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create notification
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all notifications
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get notifications by user
      .addCase(getNotificationsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotificationsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update notification
      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          (notification) => notification.notification_id === action.meta.arg.id
        );
        if (index !== -1) {
          state.notifications[index] = { ...state.notifications[index], ...action.payload };
        }
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (notification) => notification.notification_id !== action.payload.id
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;

