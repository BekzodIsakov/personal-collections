import { configureStore } from "@reduxjs/toolkit";
import latestItemsReducer from "./slices/latestItemsSlice";

export const store = configureStore({
  reducer: { latestItemsReducer },
});
