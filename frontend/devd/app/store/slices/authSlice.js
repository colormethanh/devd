import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "";
const isServer = typeof window === "undefined";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formProps, { rejectWithValue }) => {
    try {
      debugger;
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        formProps,
        { withCredentials: true }
      );
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
        debugger;
        state.token = action.payload.accessToken;
        state.user_id = action.payload.user_id;
        debugger;
      })
      .addCase(signup.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
