import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: {
    data: null,
    status: "idle",
    error: null,
  },
  users: [],
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/collections/topFive`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchTopFiveCollections.pending, (state) => {
  //       state.status = "pending";
  //     })
  //     .addCase(fetchTopFiveCollections.fulfilled, (state, action) => {
  //       state.topCollections = action.payload;
  //       state.status = "succeeded";
  //     })
  //     .addCase(fetchTopFiveCollections.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     });
  // },
});

export default usersSlice.reducer;
