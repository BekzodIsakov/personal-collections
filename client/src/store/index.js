import { configureStore } from "@reduxjs/toolkit";
import latestItemsReducer from "./slices/latestItemsSlice";
import topCollectionsReducer from "./slices/topCollectionsSlice";

export const store = configureStore({
  reducer: { latestItemsReducer, topCollectionsReducer },
});
