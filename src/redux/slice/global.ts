import { createSlice } from "@reduxjs/toolkit";

interface IState {
  darkMode: boolean;
}

const initialState: IState = {
  darkMode: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toogleDarkMode: (state, action) => {
      state.darkMode = !action.payload.darkMode;
    },
  },
});

export const { toogleDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
