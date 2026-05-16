import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'tshirt_cart';

// Create async thunk for sending cart data
// This replaces the manual thunk with createAsyncThunk
export const sendCartData = createAsyncThunk(
  'cart/sendCartData',
  async (cartData, { rejectWithValue }) => {
    try {
      // Simulate sending to Firebase/backend
      // In real scenario: await fetch('firebase-url', { method: 'PUT', body: JSON.stringify(cartData) })
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return cartData;
    } catch (error) {
      // Use rejectWithValue to return custom error payload
      return rejectWithValue(error.message || 'Failed to send cart data');
    }
  }
);

// Create async thunk for loading cart data
export const loadCartData = createAsyncThunk(
  'cart/loadCartData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate fetching from Firebase/backend
      // In real scenario: const response = await fetch('firebase-url'); return response.json();
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      const cartData = stored ? JSON.parse(stored) : { items: [], totalQuantity: 0 };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return cartData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load cart data');
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
        existingItem.quantity += 1;
      } else {
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
          state.cartItems = state.cartItems.filter(item => item.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  // Handle async thunk results here
  extraReducers: (builder) => {
    // Send Cart Data cases
    builder
      // Pending: API call is in progress
      .addCase(sendCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled: API call succeeded
      .addCase(sendCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        // Cart data is already in state, just mark as saved
      })
      // Rejected: API call failed
      .addCase(sendCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Custom error from rejectWithValue
      });
    
    // Load Cart Data cases
    builder
      // Pending: Loading from backend
      .addCase(loadCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled: Cart loaded successfully
      .addCase(loadCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.items) {
          state.cartItems = action.payload.items;
        }
        state.isInitialLoad = false;
      })
      // Rejected: Failed to load cart
      .addCase(loadCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Custom error from rejectWithValue
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
