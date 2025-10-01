import axiosInstance from "../../../config/axiosInstance.config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET ALL PRODUCTS
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products/getProducts");
      return {
        message: response.data.message,
        products: response.data.products,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Products fetch failed");
    }
  }
);

// GET PRODUCTS BY ID
export const getProductsById = createAsyncThunk(
  "products/getProductsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/getProductById/${id}`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Products fetch failed");
    }
  }
);

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/products/createProduct", product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product creation failed");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, name, description, price, stock, imageUrl }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/products/updateProduct/${id}`, {
        name,
        description,
        price,
        stock,
        imageUrl
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product update failed");
    }
  }
);


// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/products/deleteProduct/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product deletion failed");
    }
  }
);
