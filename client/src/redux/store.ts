import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import menuSlice from "./menuSlice";
import { meetApi } from "./meetApi";
import { cloudinaryApi } from "./cloudinaryApi";
import { publicApi } from "./publicApi";
import interviewSlice from "./interviewsSlice";
import jobColumnSlice from "./jobColumnSlice";
import jobSlice from "./jobsSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    interview: interviewSlice,
    jobcolumn: jobColumnSlice,
    jobdata: jobSlice,
    [meetApi.reducerPath]: meetApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(publicApi.middleware)
      .concat(meetApi.middleware)
      .concat(cloudinaryApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
