import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/Slice/authSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default Store;
