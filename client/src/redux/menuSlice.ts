import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: false,
  },
  reducers: {
    changeMenuTo: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { changeMenuTo } = menuSlice.actions;
export const selectMenu = (state: RootState) => state.menu.value;
export default menuSlice.reducer;
