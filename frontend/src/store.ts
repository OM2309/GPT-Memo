import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./redux/folderSlice";

export const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
