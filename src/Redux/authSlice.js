import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const payload = action.payload;

      state.token = payload.token;
      console.log("payload", payload);
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.authenticate.token;
