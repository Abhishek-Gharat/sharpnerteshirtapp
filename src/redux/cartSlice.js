import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartVisible: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Toggle cart visibility
    toggleCartVisibility: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
    showCart: (state) => {
      state.isCartVisible = true;
    },
    hideCart: (state) => {
      state.isCartVisible = false;
    },
    
    // Add item to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add with quantity 1
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    
    // Remove item from cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    
    // Update item quantity
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity becomes 0 or less
          state.cartItems = state.cartItems.filter(item => item.id !== productId);
        } else {
          // Update quantity
          item.quantity = quantity;
        }
      }
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export actions
export const {
  toggleCartVisibility,
  showCart,
  hideCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

// Export selectors
export const selectIsCartVisible = (state) => state.cart.isCartVisible;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartCount = (state) => 
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => 
  state.cart.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
