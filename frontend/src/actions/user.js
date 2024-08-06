import { createAsyncThunk } from "@reduxjs/toolkit";
import {BASEURL} from '../baseurl'
import axios from "axios";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ user_type, token }, thunkAPI) => {
    let api;
    if (user_type) {
      api = `${BASEURL}/api/v1/users?user_type=${user_type}`;
    } else {
      api = `${BASEURL}/api/v1/users`;
    }
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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


export const createUser = createAsyncThunk(
  "user/createUser",
  async (values, thunkAPI) => {
    try {
      // Your asynchronous logic to add student here
      const response = await fetch(`${BASEURL}/api/v1/users/add`, {
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

// Example asynchronous thunk to get students

export const getUserById = createAsyncThunk(
  "users/getUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/users/${userId}`);

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

// Example asynchronous thunk to delete student
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`${BASEURL}/api/v1/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return { userId: userId, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to update student
export const updateUser = createAsyncThunk(
  "student/updateStaff",
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`${BASEURL}/api/v1/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
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
export const updateUserStatus = createAsyncThunk(
  "student/updateUserStatus",
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`${BASEURL}/api/v1/users/status/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
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


export const setAbsent = createAsyncThunk(
  "student/setAbsent",
  async ({ staff_id, attendance, typeCase }) => {
    try {
      const requestBody = {
        staff_id,
        attendance,
        typeCase,
      };

      const response = await fetch(`${BASEURL}/api/v1/staff/attendance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const setPresent = createAsyncThunk(
  "attendance/setPresent",
  async ({ staff_id, attendance, typeCase }, thunkAPI) => {
    const requestBody = {
      staff_id,
      attendance,
      typeCase,
    };
    try {
      const response = await fetch(`${BASEURL}/api/v1/staff/present`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getEntries = createAsyncThunk(
  "student/Absensts",
  async (_, thunkAPI) => {
    console.log("HII");
    try {
      const response = await fetch(`${BASEURL}/api/v1/staff/entries`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
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

// for childresn to get their parents information
export const fetchChildrenAndUserInfo = async (childId) => {
  try {
    const response = await axios.get(`${BASEURL}/api/v1/user/childs-parent-info/${childId}`); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching children and user info:", error);
    throw error;
  }
};


//for parents to get their childrens 
export const fetchParentAndChildren = async (parentId) => {
  try {
    const response = await axios.get(`${BASEURL}/api/v1/user/parent-childrens-info/${parentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching parent and children info:", error);
    throw error;
  }
};
