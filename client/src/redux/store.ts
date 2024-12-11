import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import menuSlice from "./menuSlice";
import { meetApi } from "./meetApi";
import { cloudinaryApi } from "./cloudinaryApi";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    [meetApi.reducerPath]: meetApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(meetApi.middleware)
      .concat(cloudinaryApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
