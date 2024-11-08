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

export const getTask = createAsyncThunk(
  "project/getTask",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/projects/${params.project_id}/tasks/${params.task_id}`
      );
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateTaskInDB = createAsyncThunk(
  "project/updateTask",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/${params.project_id}/tasks/${params.task_id}`,
        params.updates,
        { withCredentials: true }
      );
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getPage = createAsyncThunk(
  "project/getPage",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/projects/${params.project_id}/pages/${params.page_id}`,
        {
          headers: {
            Authorization: `Bearer ${params.access_token}`,
          },
        }
      );
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
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload.task;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(updateTaskInDB.fulfilled, (state, action) => {
        state.task = action.payload.updatedTask;
      })
      .addCase(updateTaskInDB.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(getPage.fulfilled, (state, action) => {
        state.page = action.payload.page;
      })
      .addCase(getPage.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

export default projectSlice.reducer;
