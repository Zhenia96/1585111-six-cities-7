import { createReducer } from '@reduxjs/toolkit';
import { changeHotels, changeHotelsLoadingStatus } from '../action';

const initialState = {
  hotels: [],
  hotelsLoadingStatus: false,
};

export const hotelsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeHotels, ((state, action) => {
      state.hotels = action.payload;
    }))
    .addCase(changeHotelsLoadingStatus, ((state, action) => {
      state.hotelsLoadingStatus = action.payload;
    }));
});
