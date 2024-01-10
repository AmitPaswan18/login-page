import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tweet: [],
  error: null,
};

const tweetAction = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getTweet(state, action) {
      state.tweet = action.payload;
    },
  },
});

export const { getTweet } = tweetAction.actions;

export default tweetAction.reducer;
