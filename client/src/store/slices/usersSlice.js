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

export const signInUser = createAsyncThunk(
  "users/signInUser",
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

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (userCredentails, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_URL}/users/new`,
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

export const signOutUser = createAsyncThunk(
  "users/signOutUser",
  async (thunkAPI) => {
    try {
      await axios.post(`${import.meta.env.VITE_DEV_URL}/users/signout`, {
        headers: { "Content-Type": "application/json" },
      });
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
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.currentUser.data = payload;
        state.currentUser.status = "succeeded";
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.currentUser.status = "failed";
        state.currentUser.error = payload.error;
      })
      .addCase(signOutUser.pending, (state) => {
        state.currentUser.status = "pending";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.currentUser.data = null;
        state.currentUser.status = "succeeded";
      })
      .addCase(signOutUser.rejected, (state, { payload }) => {
        state.currentUser.status = "failed";
        state.currentUser.error = payload.error;
      })
      .addCase(signUpUser.pending, (state) => {
        state.currentUser.status = "pending";
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.currentUser.data = payload;
        state.currentUser.status = "succeeded";
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.currentUser.status = "failed";
        state.currentUser.error = payload.error;
      });
  },
});

export default usersSlice.reducer;
