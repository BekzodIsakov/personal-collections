import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  latestItems: [],
  status: "idle",
  error: null,
};

export const fetchLatestItems = createAsyncThunk(
  "latestItems/fetchLatestItems",
  async (queries, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_URL}/items?sortBy=${
          queries.sortBy
        }&limit=${queries.limit}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const latestItemsSlice = createSlice({
  name: "latestItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchLatestItems.fulfilled, (state, action) => {
        state.latestItems = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchLatestItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default latestItemsSlice.reducer;
