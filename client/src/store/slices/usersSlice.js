import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: {
    data: null,
    // data: { name: "User Name" },
    status: "idle",
    error: null,
  },
  users: [],
};

export const signInUser = createAsyncThunk(
  "users/createUser",
  async (userCredentails, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_URL}/users/signin`,
        userCredentails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.currentUser.status = "pending";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser.data = action.payload;
        state.currentUser.status = "succeeded";
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.currentUser.status = "failed";
        state.currentUser.error = payload.error;
      });
  },
});

export default usersSlice.reducer;
