import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const firebaseUser = action.payload;
      const role =
        firebaseUser?.email === "lamhuynhhueman.ptht@gmail.com"
          ? "admin"
          : "user";
      const userObj = { ...firebaseUser, role };
      state.user = userObj;
      // Lưu vào localStorage khi login
      localStorage.setItem("user", JSON.stringify(userObj));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
