import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

// export const signInUser = createAsyncThunk(
//   "users/signInUser",
//   async (userCredentails, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_DEV_URL}/users/signin`,
//         userCredentails,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.response.data.message });
//     }
//   }
// );

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(signInUser.pending, (state) => {
    //     state.currentUser.status = "pending";
    //   })
    //   .addCase(signInUser.fulfilled, (state, { payload }) => {
    //     state.currentUser.data = payload;
    //     state.currentUser.status = "succeeded";
    //     localStorage.setItem("currentUser", payload)
    //   })
    //   .addCase(signInUser.rejected, (state, { payload }) => {
    //     state.currentUser.status = "failed";
    //     state.currentUser.error = payload.error;
    //   });
  },
});

export default usersSlice.reducer;
