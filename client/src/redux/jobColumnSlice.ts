import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Column } from "../types";
import { arrayMove } from "@dnd-kit/sortable";

export const jobColumnSlice = createSlice({
  name: "jobcolumn",
  initialState: [] as Column[],
  reducers: {
    //addColumnsAfterFetching
    addPreJobCoLumn: (state, action: PayloadAction<Column[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
    // Add a single interview
    addJobColumn: (state, action: PayloadAction<Column>) => {
      state.push(action.payload);
    },

    // Delete an interview by id
    deleteJobColumn: (state, action: PayloadAction<string>) => {
      return state.filter((col: Column) => col.id !== action.payload);
    },

    renameJobColumn: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const column = state.find((col) => col.id === action.payload.id);
      if (column) {
        column.columnTitle = action.payload.title; // Mutate the column directly
      }
    },

    swipeColumn: (
      state,
      action: PayloadAction<{
        activeColumnId: number;
        overColumnId: number;
      }>
    ) => {
      const activeColumnIdx = state.findIndex(
        (col) => col.idx === action.payload.activeColumnId
      );
      const overColumnIdx = state.findIndex(
        (col) => col.idx === action.payload.overColumnId
      );
      state[activeColumnIdx].idx = action.payload.overColumnId;
      state[overColumnIdx].idx = action.payload.activeColumnId;
      return arrayMove(state, activeColumnIdx, overColumnIdx);
    },
  },
});

export const {
  addPreJobCoLumn,
  addJobColumn,
  deleteJobColumn,
  renameJobColumn,
  swipeColumn,
} = jobColumnSlice.actions;
export const jobcolumnList = (state: RootState) => state.jobcolumn;
export default jobColumnSlice.reducer;
