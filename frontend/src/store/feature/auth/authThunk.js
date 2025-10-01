import axiosInstance from "../../../config/axiosInstance.config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/signup", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/getUser");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user info");
    }
  }
);
