import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";
const isServer = typeof window === "undefined";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, formProps, {
        withCredentials: true,
      });
      !isServer && localStorage.setItem("token", response.data.payload.token);
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formProps, {
        withCredentials: true,
      });

      !isServer && localStorage.setItem("token", response.data.payload.token);
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    error: "",
    user_id: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user_id = action.payload.user_id;
      })
      .addCase(signup.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user_id = action.payload.user_id;
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
