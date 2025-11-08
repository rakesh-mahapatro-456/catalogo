import axiosInstance from "../../../config/axiosInstance.config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart");
      return {
        message: response.data.message,
        cart: response.data.cart,
        total : response.data.total
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart", { productId, qty });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

// REMOVE FROM CART
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
    }
  }
);

// CHECKOUT CART
export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async ({ name, email, cartItems }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart/checkout", {
        name,
        email,
        cartItems,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Checkout failed");
    }
  }
);
