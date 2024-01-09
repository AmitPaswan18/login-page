import { configureStore } from "@reduxjs/toolkit";
import authlogin from "../Slices/authlogin.js";

const store = configureStore({
  reducer: {
    auth: authlogin,
  },
});

export default store;
