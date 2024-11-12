import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getComponent = createAsyncThunk(
  "component/getComponent",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/projects/${params.project_id}/components/${params.component_id}`,
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

export const updateComponentInDB = createAsyncThunk(
  "component/updateComponent",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/${params.project_id}/components/${params.component_id}`,
        params.updates,
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

const componentSlice = createSlice({
  name: "component",
  initialState: {
    component: {},
    error: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComponent.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getComponent.fulfilled, (state, action) => {
        state.component = action.payload.component;
        state.isLoading = false;
      })
      .addCase(getComponent.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateComponentInDB.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateComponentInDB.fulfilled, (state, action) => {
        state.component = action.payload.updatedComponent;
        state.isLoading = false;
      })
      .addCase(updateComponentInDB.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default componentSlice.reducer;
