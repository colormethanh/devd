import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

export const getProject = createAsyncThunk(
  "project/getProject",
  async (project_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/projects/${project_id}`);
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({ status: err.status, message: err.message });
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: {},
    error: {},
    role: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default projectSlice.reducer;
