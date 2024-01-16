import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  tweet: [],
  error: null,
  loading: true,
  isEditable: false,
  editableTweetId: null,
  isIdle: false,
  totalTweets: null,
};

const tweetAction = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getTweet(state, action) {
      state.tweet = action.payload;
      state.isEditable = false;
      state.totaTweets = action.payload;
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

    tweetPage(state, action) {
      state.totalTweets = action.payload;
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
  tweetPage,
} = tweetAction.actions;

export default tweetAction.reducer;
