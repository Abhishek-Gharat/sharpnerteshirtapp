import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartVisible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartVisibility: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
    showCart: (state) => {
      state.isCartVisible = true;
    },
    hideCart: (state) => {
      state.isCartVisible = false;
    },
  },
});

export const { toggleCartVisibility, showCart, hideCart } = cartSlice.actions;

export const selectIsCartVisible = (state) => state.cart.isCartVisible;

export default cartSlice.reducer;
