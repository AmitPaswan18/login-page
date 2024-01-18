import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  tweet: [],
  error: null,
  loading: true,
  editableTweetId: null,
  isIdle: false,
  totalTweets: null,
  status: null,
};

const tweetAction = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getTweet(state, action) {
      state.tweet = action.payload;
      state.totalTweets = action.payload;
    },
    deleteTweet: (state, action) => {
      state.tweet = state.tweet.filter((ele) => ele._id !== action.payload.id);
      state.status = action.payload.status;
      state.editableTweetId = null;
    },
    updateTweet(state, action) {
      const { id, newText } = action.payload;
      state.tweet = state.tweet.map((ele) =>
        ele._id === id ? { ...ele, text: newText } : ele
      );
      state.editableTweetId = action.payload.id;
    },

    setEditable(state, action) {
      state.editableTweetId = action.payload.id;
    },

    tweetPage(state, action) {
      state.totalTweets = action.payload;
    },
  },
});

export const { getTweet, deleteTweet, updateTweet, setEditable, tweetPage } =
  tweetAction.actions;

export default tweetAction.reducer;
