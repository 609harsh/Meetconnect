import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { NavbarMenu } from "../types";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: {
      value: NavbarMenu.INTERVIEW,
    },
  },
  reducers: {
    changeMenuTo: (state, action: PayloadAction<any>) => {
      state.value = { ...action.payload };
    },
  },
});

export const { changeMenuTo } = menuSlice.actions;
export const selectMenu = (state: RootState) => state.menu.value;
export default menuSlice.reducer;
