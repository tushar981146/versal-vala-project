import { configureStore } from "@reduxjs/toolkit";
import authStore from "./authStore";

const store = configureStore({
  reducer: {
    auth: authStore,
  },
});

export default store;