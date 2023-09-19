import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cart: 0,
};

export const CartSlices = createSlice({
  name: "CartSlices",
  initialState,
  reducers: {
    increaseCart: (state) => {
      state.cart += 1;
    },
    decreaseCart: (state) => {
      state.cart -= 1;
    },
    nullCart: (state) => {
      state.cart = 0;
    },
    productDetail: (state, action) => {
      state.product.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.product = state.product.filter((x) => x.id !== action.payload.id);
    },
    nullProduct: (state) => {
      state.product = [];
    },
  },
});

export const {
  increaseCart,
  productDetail,
  decreaseCart,
  removeProduct,
  nullCart,
  nullProduct,
} = CartSlices.actions;
export default CartSlices.reducer;
