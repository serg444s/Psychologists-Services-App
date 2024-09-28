import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campersSlice";
import { filtersReducer } from "./filtersSlice";
import { favoriteReducer } from "./favoriteSlice";


export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorite: favoriteReducer,
  },
});