import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import menuSlice from "./menuSlice";
import { meetApi } from "./ApiSlice/meetApi";
import { cloudinaryApi } from "./ApiSlice/cloudinaryApi";
import { publicApi } from "./ApiSlice/publicApi";
import interviewSlice from "./interviewsSlice";
import jobColumnSlice from "./jobColumnSlice";
import jobSlice from "./jobsSlice";
import { trackerApi } from "./ApiSlice/trackerApi";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    interview: interviewSlice,
    jobcolumn: jobColumnSlice,
    jobdata: jobSlice,
    [meetApi.reducerPath]: meetApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [trackerApi.reducerPath]: trackerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(publicApi.middleware)
      .concat(meetApi.middleware)
      .concat(cloudinaryApi.middleware)
      .concat(trackerApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
