import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchNote: false,
};

export const FetchNoteSlices = createSlice({
  name: "FetchNoteSlices", 
  initialState,
  reducers: {
    togglefetchNote: (state, action) => {
      state.fetchNote = action.payload;
    },
  },
});

export const { togglefetchNote } = FetchNoteSlices.actions;
export default FetchNoteSlices.reducer;