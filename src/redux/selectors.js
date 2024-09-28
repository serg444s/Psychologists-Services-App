import { createSelector } from "@reduxjs/toolkit";

export const selectAllCampers = (state) => state.campers.campers;
export const getCampersStatus = (state) => state.campers.loading;
export const getCampersError = (state) => state.campers.error;
const selectFilterLocation = (state) => state.filters.location;
const selectFilterType = (state) => state.filters.type;
const selectFilterEquipment = (state) => state.filters.equipment;
export const selectPage = (state) => state.campers.page;
export const selectLastPage = (state) => state.campers.lastPage;
export const selectFavoriteCampers = (state) => state.favorite.favorite;


export const selectFilteredCampers = createSelector(
    [selectAllCampers, selectFilterLocation, selectFilterType, selectFilterEquipment],
    (campers, locationFilter, type, equipment) => {     

      return campers.filter((camper) => {
        const matchesLocation = camper.location.toLowerCase().includes(locationFilter.toLowerCase());
        const matchesType = camper.form.includes(type);
  
        const matchesEquipment = 
          (!equipment.airConditioner || camper.details.airConditioner > 0) &&
          (!equipment.kitchen || camper.details.kitchen > 0) &&
          (!equipment.TV || camper.details.TV > 0) &&         
          (!equipment.shower || camper.details.shower > 0) &&
          (!equipment.automatic || camper.transmission === "automatic");

  
        return matchesLocation && matchesType && matchesEquipment;
      });
    }
  );


  export const selectFilteredFavorites = createSelector(
    [selectFavoriteCampers, selectFilterLocation, selectFilterType, selectFilterEquipment],
    (campers, locationFilter, type, equipment) => {     

      return campers.filter((camper) => {
        const matchesLocation = camper.location.toLowerCase().includes(locationFilter.toLowerCase());
        const matchesType = camper.form.includes(type);
  
        const matchesEquipment = 
          (!equipment.airConditioner || camper.details.airConditioner > 0) &&
          (!equipment.kitchen || camper.details.kitchen > 0) &&
          (!equipment.TV || camper.details.TV > 0) &&         
          (!equipment.shower || camper.details.shower > 0) &&
          (!equipment.automatic || camper.transmission === "automatic");

  
        return matchesLocation && matchesType && matchesEquipment;
      });
    }
  );