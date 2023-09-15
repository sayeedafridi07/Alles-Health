import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: getUserFromLocalStorage(),
};

export function getUserFromLocalStorage() {
  try {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) : null;
  } catch (error) {
    console.error("Error while parsing user from localStorage:", error);
    return null;
  }
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
