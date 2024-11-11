import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPage = createAsyncThunk(
  "page/getPage",
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
      return rejectWithValue({ status: err.status, message: err.message });
    }
  }
);

export const updatePageInDB = createAsyncThunk(
  "page/updatePage",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/${[params.project_id]}/pages/${params.page_id}`,
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

export const uploadImageToPage = createAsyncThunk(
  "page/uploadPageImage",
  async (params, { rejectWithValue }) => {
    const response = await axios.put(
      `${BASE_URL}/projects/${[params.project_id]}/pages/${
        params.page_id
      }/image`,
      params.updates,
      {
        headers: {
          Authorization: `Bearer ${params.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.payload;
  }
);

const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: {},
    error: {},
    isLoading: false,
  },
  reducers: {
    resetPage: (state, action) => {
      state.page = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPage.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.isLoading = false;
      })
      .addCase(getPage.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePageInDB.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePageInDB.fulfilled, (state, action) => {
        state.page = action.payload.updatedPage;
        state.isLoading = false;
      })
      .addCase(updatePageInDB.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { resetPage } = pageSlice.actions;

export default pageSlice.reducer;
