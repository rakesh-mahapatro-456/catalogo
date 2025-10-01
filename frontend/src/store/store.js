import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice.js"
import productReducer from "./feature/product/productSlice.js"

export const store = configureStore({
  reducer: {
   auth: authReducer,
   product : productReducer
  },
});
