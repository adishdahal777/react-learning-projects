import { configureStore } from "@reduxjs/toolkit";
import FetchNoteSlices from "../src/Reducers/FetchNoteSlices";
import CartSlices from "../src/Reducers/CartSlices";
import DisplayManagerSlices from "../src/Reducers/DisplayManagerSlices";

export const store = configureStore({
  reducer: {
    fetchNoteSlices: FetchNoteSlices,
    cartSlices: CartSlices,
    displayManagerSlices: DisplayManagerSlices,
  },
});
