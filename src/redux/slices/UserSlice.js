import { createSlice } from "@reduxjs/toolkit";

function getSetLocalStorage({ key, value }) {
  if (typeof window !== "undefined") {
    // Check if localStorage is available in the browser environment
    if (value) {
      localStorage.setItem(key, value);
    } else {
      return localStorage.getItem(key);
    }
  }
  // Return null or handle the case when localStorage is not available
  return null;
}

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: getSetLocalStorage({ key: "token" }),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});



export const { setToken, setUser } = UserSlice.actions;

export default UserSlice.reducer;
