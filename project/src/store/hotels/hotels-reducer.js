import { createReducer } from '@reduxjs/toolkit';
import { changeHotels, changeFavoriteStatus, changeHotelsLoadingStatus } from '../action';

const initialState = {
  hotels: [],
  hotelsLoadingStatus: false,
};

export const hotelsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeHotels, ((state, action) => {
      state.hotels = action.payload;
    }))
    .addCase(changeFavoriteStatus, ((state, action) => {
      const index = state.hotels.findIndex((hotel) => hotel.id === action.payload);
      state.hotels[index].isFavorite = !state.hotels[index].isFavorite;
    }))
    .addCase(changeHotelsLoadingStatus, ((state, action) => {
      state.hotelsLoadingStatus = action.payload;
    }));
});
