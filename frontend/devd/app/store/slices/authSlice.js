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
      debugger;
      !isServer && localStorage.setItem("token", response.data.payload.token);
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({ status: err.status, message: err.message });
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
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({ status: err.status, message: err.message });
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({ status: err.status, message: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: undefined,
    error: "",
    user_id: undefined,
    user: undefined,
    needs_login: true,
    is_loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.is_loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user_id = action.payload.user_id;
        state.user = action.payload.user;
        state.needs_login = false;
        state.is_loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.is_loading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.is_loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user_id = action.payload.user_id;
        state.user = action.payload.user;
        state.needs_login = false;
        state.is_loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.is_loading = false;
      })
      .addCase(refreshAccessToken.pending, (state, action) => {
        state.is_loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user_id = action.payload.user_id;
        state.user = action.payload.user;
        state.needs_login = false;
        state.is_loading = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.needs_login = true;
        state.is_loading = false;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
