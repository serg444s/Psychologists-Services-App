import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",

  initialState: {
    location: "",
    equipment: {
      airConditioner: 0,
      automatic: "",
      kitchen: 0,
      TV: 0,
      shower: 0,
    },
    type: "",

  },
  reducers: {
    changeFilter(state, action) {
      state.location = action.payload.location;
      state.equipment.airConditioner = action.payload.airConditioner;
      state.equipment.automatic = action.payload.automatic;
      state.equipment.kitchen = action.payload.kitchen;
      state.equipment.TV = action.payload.TV;
      state.equipment.shower = action.payload.shower;
      state.type = action.payload.type;

    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;