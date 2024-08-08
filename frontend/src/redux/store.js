// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import courseReducer from "./courseSlice";
import attendanceReducer from "./attendanceSlice";
import leaveReducer from "./leaveSlice";
import reviewReducer from "./reviewSlice";
import permissionsReducer from './permissionsSlice';
import enrollmentReducer from "./enrollmentSlice";
import notificationReducer from "./notificationSlice";
import blogReducer from "./blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  courses: courseReducer,
  blogs: blogReducer,
  attendance: attendanceReducer,
  leaves: leaveReducer,
  reviews: reviewReducer,
  enrollments:enrollmentReducer,
  permissions: permissionsReducer,
  notifications:notificationReducer // Add any other reducers here.
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [],
  debug: true,
  timeout: 0,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
