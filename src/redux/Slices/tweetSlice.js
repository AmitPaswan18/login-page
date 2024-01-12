import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  tweet: [],
  error: null,
  loading: true,
  isEditable: false,
  editableTweetId: null,
  isIdle: false,
};

const tweetAction = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getTweet(state, action) {
      state.tweet = action.payload;
      state.isEditable = false;
      state.editableTweetId = null;
    },
    deleteTweet(state, action) {
      state.tweet = action.payload;
      state.isEditable = false;
      state.editableTweetId = null;
    },
    updateTweet(state, action) {
      state.tweet = action.payload;
      state.isEditable = false;
      state.editableTweetId = null;
    },
    setEditable(state, action) {
      state.isEditable = true;
      state.editableTweetId = action.payload;
    },
    startCorn(state, action) {
      state.isIdle = action.payload;
    },
    stopCorn(state, action) {
      state.isIdle = false;
    },
  },
});

export const {
  getTweet,
  deleteTweet,
  updateTweet,
  setEditable,
  startCorn,
  stopCorn,
} = tweetAction.actions;

export default tweetAction.reducer;
