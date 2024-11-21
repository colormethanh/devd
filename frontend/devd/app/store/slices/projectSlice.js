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

export const getShowcaseData = createAsyncThunk(
  "project/getShowcaseData",
  async (project_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/projects/${project_id}/showcase`
      );
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({ status: err.status, message: err.message });
    }
  }
);
const projectSlice = createSlice({
  name: "project",
  initialState: {
    requestedProject: "",
    project: {},
    error: {},
    role: "",
    isLoading: false,
  },
  reducers: {
    setRequestedProject: (state, action) => {
      state.requestedProject = action.payload;
    },
  },
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
      })
      .addCase(getShowcaseData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getShowcaseData.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
      })
      .addCase(getShowcaseData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setRequestedProject } = projectSlice.actions;

export default projectSlice.reducer;
