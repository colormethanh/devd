import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, formProps, {
        withCredentials: true,
      });
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({
        status: err.status,
        message: err.message,
        response_message: err.response.data.payload.message,
      });
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
      debugger;
      return rejectWithValue({
        status: err.status,
        message: err.message,
        response_message: err.response.data.payload.message,
      });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
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
        state.error = undefined;
        state.is_loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.is_loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.error = undefined;
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
        state.error = action.payload;
        state.is_loading = false;
      })
      .addCase(refreshAccessToken.pending, (state, action) => {
        state.error = undefined;
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
        state.error = action.payload;
        state.needs_login = true;
        state.is_loading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.error = undefined;
        state.is_loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.is_loading = false;
        state.token = undefined;
        state.error = "";
        state.user_id = undefined;
        state.user = undefined;
        state.needs_login = true;
        state.is_loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.is_loading = false;
      });
  },
});

export default authSlice.reducer;
