import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'tshirt_cart';

// Async thunk to send cart data to backend (localStorage for now due to CORS)
export const sendCartData = createAsyncThunk(
  'cart/sendCartData',
  async (cartData, { rejectWithValue }) => {
    try {
      // Simulate API call with localStorage
      // In a real scenario, this would be: await fetch('/api/cart', { method: 'PUT', body: JSON.stringify(cartData) })
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to load cart data from backend (localStorage)
export const loadCartData = createAsyncThunk(
  'cart/loadCartData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with localStorage
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      const cartData = stored ? JSON.parse(stored) : { items: [], totalQuantity: 0 };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return cartData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isCartVisible: false,
  cartItems: [],
  isLoading: false,
  error: null,
  isInitialLoad: true,
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
  extraReducers: (builder) => {
    builder
      .addCase(sendCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendCartData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.items) {
          state.cartItems = action.payload.items;
        }
        state.isInitialLoad = false;
      })
      .addCase(loadCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isInitialLoad = false;
      });
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
export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;
export const selectIsInitialLoad = (state) => state.cart.isInitialLoad;

export default cartSlice.reducer;
