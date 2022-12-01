import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload.email;
    },
    removeUser: (state) => {
      state.email = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state) => state.user.email;

export default userSlice.reducer;
