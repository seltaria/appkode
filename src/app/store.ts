import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: 
    (getDefaultMiddleware) => 
      getDefaultMiddleware()
      .concat(userApi.middleware)
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];