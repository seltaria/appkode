import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: 
    (getDefaultMiddleware) => 
      getDefaultMiddleware()
      .concat(userApi.middleware)
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];