import { configureStore } from "@reduxjs/toolkit";
import authlogin from "../Slices/authlogin.js";
import tweetSlice from "../Slices/tweetSlice.js";

const store = configureStore({
  reducer: {
    auth: authlogin,
    tweet: tweetSlice,
  },
});

export default store;
