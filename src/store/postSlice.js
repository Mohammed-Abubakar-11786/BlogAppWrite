import { createSlice } from "@reduxjs/toolkit";

const postInitialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {
    updateStorePosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { updateStorePosts } = postSlice.actions;

export default postSlice.reducer;
