import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
  value: {
    items: [],
    loading: "idle",
    error: null,
  }
}

// export const fetchLatestItems = createAsyncThunk("latestItems/fetchLatestItems", async(_, {dispatch}) => {
//   try {
//     dispatch(latestItemsLoading())
//     const response = await fetch("URL");
//     return response.data
//   } catch (error) {
//     dispatch(fetchLatestItemsFailed(error))
//   }
// })

export const latestItemsSlice = createSlice({
  name: "latestItems",
  initialState,
  reducers: {
    latestItemsLoading: () => {
      if (loading === "idle") {
        loading === "pending";
      }
    },
    fetchLatestItemsFailed: (state, action) => {

    }
    getLatestItems: () => {

    }
  }
})

