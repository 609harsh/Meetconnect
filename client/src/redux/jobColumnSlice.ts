import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Column } from "../types";
import { arrayMove } from "@dnd-kit/sortable";

export const jobColumnSlice = createSlice({
  name: "jobcolumn",
  initialState: [] as Column[],
  reducers: {
    // Add a single interview
    addJobColumn: (state, action: PayloadAction<Column>) => {
      state.push(action.payload);
    },

    // Delete an interview by id
    deleteJobColumn: (state, action: PayloadAction<String | Number>) => {
      return state.filter((col: Column) => col.id !== action.payload);
    },

    renameJobColumn: (state, action: PayloadAction<Column>) => {
      const column = state.find((col) => col.id === action.payload.id);
      if (column) {
        column.title = action.payload.title; // Mutate the column directly
      }
    },

    swipeColumn: (
      state,
      action: PayloadAction<{
        activeColumnId: string | number;
        overColumnId: string | number;
      }>
    ) => {
      const activeColumnIdx = state.findIndex(
        (col) => col.id === action.payload.activeColumnId
      );
      const overColumnIdx = state.findIndex(
        (col) => col.id === action.payload.overColumnId
      );
      return arrayMove(state, activeColumnIdx, overColumnIdx);
    },
  },
});

export const { addJobColumn, deleteJobColumn, renameJobColumn, swipeColumn } =
  jobColumnSlice.actions;
export const jobcolumnList = (state: RootState) => state.jobcolumn;
export default jobColumnSlice.reducer;
