import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../store/authSlice";
import postReducers from "../store/postSlice";
const store = configureStore({
  reducer: {
    auth: authReducers,
    posts: postReducers,
  },
});

export default store;
