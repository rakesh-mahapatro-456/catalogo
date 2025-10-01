import { createSlice } from "@reduxjs/toolkit";
import { getProducts,getProductsById, createProduct, updateProduct, deleteProduct } from "./productThunk.js";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  message: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state, action) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.message = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.message = action.payload;
    };

    
    builder
      // GET PRODUCTS
      .addCase(getProducts.pending, handlePending)
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.message = action.payload.message;
      })
      .addCase(getProducts.rejected, handleRejected)

      // GET PRODUCTS BY ID
      .addCase(getProductsById.pending, handlePending)
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
        state.message = action.payload.message;
      })
      .addCase(getProductsById.rejected, handleRejected)

      // CREATE PRODUCT
      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
        state.message = action.payload.message;
      })
      .addCase(createProduct.rejected, handleRejected)

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        state.message = action.payload.message;
      })
      .addCase(updateProduct.rejected, handleRejected)

      // DELETE PRODUCT
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.productId
        );
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export const { clearMessage, setSelectedProduct,clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
