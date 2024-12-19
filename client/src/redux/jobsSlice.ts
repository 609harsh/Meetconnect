import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Job } from "../types";

export const jobSlice = createSlice({
  name: "jobdata",
  initialState: [] as Job[],
  reducers: {
    // Add a single interview
    addJob: (state, action: PayloadAction<Job>) => {
      state.push(action.payload);
    },

    // Delete an interview by id
    deleteJob: (state, action: PayloadAction<string | number>) => {
      return state.filter((job: Job) => job.id !== action.payload);
    },

    swipeSamecolumnJob: (
      state,
      action: PayloadAction<{
        activeId: string | number;
        overId: string | number;
      }>
    ) => {
      const activeIdx = state.findIndex(
        (job) => job.id.toString() === action.payload.activeId.toString()
      );
      const overIdx = state.findIndex(
        (job) => job.id.toString() === action.payload.overId.toString()
      );
      state[activeIdx].list = state[overIdx].list.toString();
      state.splice(
        overIdx < 0 ? state.length + overIdx : overIdx,
        0,
        state.splice(activeIdx, 1)[0]
      );
      // return arrayMove(state, activeIdx, overIdx);
    },
    swipeDifferentColumnJob: (
      state,
      action: PayloadAction<{
        activeId: string | number;
        overId: string | number;
      }>
    ) => {
      const activeIdx = state.findIndex(
        (job) => job.id.toString() === action.payload.activeId.toString()
      );

      state[activeIdx].list = action.payload.overId.toString();
      // state[activeIdx].list = state[overIdx].list;
      // const newArray = state.slice();
      state.splice(
        activeIdx < 0 ? state.length + activeIdx : activeIdx,
        0,
        state.splice(activeIdx, 1)[0]
      );

      // return newArray;
      // return arrayMove(newStat, activeIdx, activeIdx);
    },
  },
});

export const {
  addJob,
  deleteJob,
  swipeSamecolumnJob,
  swipeDifferentColumnJob,
} = jobSlice.actions;
export const jobsdata = (state: RootState) => state.jobdata;
export default jobSlice.reducer;
