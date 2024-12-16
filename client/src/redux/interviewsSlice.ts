import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Interview } from "../types";

export const interviewSlice = createSlice({
  name: "interview",
  initialState: [] as Interview[],
  reducers: {
    // Add a single interview
    addInterview: (state, action: PayloadAction<Interview>) => {
      state.push(action.payload);
    },

    // Delete an interview by id
    deleteInterview(state, action: PayloadAction<String>) {
      state.filter((interview: Interview) => interview.id !== action.payload);
    },

    // Add all interviews (bulk add, replacing current data)
    addAllInterviews: (state, action: PayloadAction<Interview[]>) => {
      state = action.payload;
    },
  },
});

export const { addInterview, deleteInterview, addAllInterviews } =
  interviewSlice.actions;
export const interviewList = (state: RootState) => state.interview;
export default interviewSlice.reducer;
