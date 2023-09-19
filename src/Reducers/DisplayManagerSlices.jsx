import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmModal: false,
};

export const DisplayManagerSlices = createSlice({
  name: "DisplayManagerSlices",
  initialState,
  reducers: {
    toogleConfirmationModal: (state, action) => {
      state.confirmModal = action.payload;
    },
  },
});

export const { toogleConfirmationModal } = DisplayManagerSlices.actions;
export default DisplayManagerSlices.reducer;
