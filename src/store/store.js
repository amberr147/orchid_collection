import { configureStore } from "@reduxjs/toolkit";

import orchidsReducer from "../features/orchids/orchidsSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    orchids: orchidsReducer,
    user: userReducer,
  },
});
