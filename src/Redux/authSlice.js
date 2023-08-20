import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: { user: null, password: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, password, token } = action.payload;
      state.user = user;
      state.password = password;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.password = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
