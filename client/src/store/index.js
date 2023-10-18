// store.js
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserInfoSlice";

const store = configureStore({
  reducer: {
    UserInfo: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
