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
      return rejectWithValue(err);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: {},
    error: "",
    component: {},
    page: {},
    task: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload.project;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

export default projectSlice.reducer;
