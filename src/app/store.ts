import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { themeSlice } from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [themeSlice.reducerPath]: themeSlice.reducer,
  },
  middleware: 
    (getDefaultMiddleware) => 
      getDefaultMiddleware()
      .concat(userApi.middleware)
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];