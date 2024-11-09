import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTask = createAsyncThunk(
  "project/getTask",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/projects/${params.project_id}/tasks/${params.task_id}`,
        {
          headers: {
            Authorization: `Bearer ${params.access_token}`,
          },
        }
      );
      return response.data.payload;
    } catch (err) {
      return rejectWithValue({ status: err.status, message: err.message });
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
      return rejectWithValue({ status: err.status, message: err.message });
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: {},
    error: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload.task;
        state.isLoading = false;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateTaskInDB.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInDB.fulfilled, (state, action) => {
        state.task = action.payload.updatedTask;
        state.isLoading = false;
      })
      .addCase(updateTaskInDB.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export default taskSlice.reducer;
