import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isLoginAuthenticated: false,
  error: null,
};

const authlogin = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signinsucces(state, action) {
      state.isLoginAuthenticated = true;
      state.user = action.payload;
      state.isLoginAuthenticated = true;
    },
    signinFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const { signinsucces, signinFail } = authlogin.actions;

export default authlogin.reducer;
