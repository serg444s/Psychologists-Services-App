import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, getStartCampers } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.error = null;
  state.campers = [...state.campers, ...action.payload];
  if (action.payload.length < 4) {
    state.lastPage = true;
  }
};


const campersSlice = createSlice({
  name: 'campers',
  initialState: {
  campers: [],
 loading: false,
 error: null,
 page: 1,
 lastPage: false,
  },
  reducers: {
    incrementPage(state) {
      state.page += 1;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getStartCampers.pending, handlePending)
      .addCase(getStartCampers.fulfilled,  (state, action) => {
        state.loading = false;
        state.campers = action.payload;
        state.lastPage = false;
        state.page = 1;

        
      })
      .addCase(getStartCampers.rejected, handleRejected)
      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, handleFulfilled)
      .addCase(fetchCampers.rejected, handleRejected);
  },
});

export const { incrementPage } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;