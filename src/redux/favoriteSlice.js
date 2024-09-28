import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
  },
  reducers: {
    changeFavorite(state, action) {
      const index = state.favorite.findIndex(item => item._id === action.payload._id);
      if (index === -1) {
      state.favorite.push(action.payload);
      }else { 
        state.favorite.splice(index, 1);

      }
    },
  },
});

export const { changeFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;