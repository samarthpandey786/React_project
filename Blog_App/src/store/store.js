// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"; // ✅ Make sure the path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Register your auth slice here
  },
});

export default store;
