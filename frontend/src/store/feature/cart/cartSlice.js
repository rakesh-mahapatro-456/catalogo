import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  checkoutCart,
} from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- FETCH CART ---
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload?.cart;

        // handle both possible shapes
        if (Array.isArray(data)) {
          state.cart = data;
          state.total = action.payload?.total || 0;
        } else {
          state.cart = data?.items || [];
          state.total = data?.total || 0;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- ADD TO CART ---
      .addCase(addToCart.fulfilled, (state, action) => {
        const data = action.payload?.cart;
        if (Array.isArray(data)) {
          state.cart = data;
          state.total = action.payload?.total || 0;
        } else {
          state.cart = data?.items || [];
          state.total = data?.total || 0;
        }
      })

      // --- REMOVE FROM CART ---
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const data = action.payload?.cart;
        if (Array.isArray(data)) {
          state.cart = data;
          state.total = action.payload?.total || 0;
        } else {
          state.cart = data?.items || [];
          state.total = data?.total || 0;
        }
      })

      // --- CHECKOUT CART ---
      .addCase(checkoutCart.fulfilled, (state) => {
        state.cart = [];
        state.total = 0;
      });
  },
});

export default cartSlice.reducer;
