import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../redux/createSlice";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    middleware: customizedMiddleware,
  },
});
