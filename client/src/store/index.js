import { configureStore } from "@reduxjs/toolkit";
import latestItemsReducer from "./slices/latestItemsSlice";
import topCollectionsReducer from "./slices/topCollectionsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: { latestItemsReducer, topCollectionsReducer, usersReducer },
});
