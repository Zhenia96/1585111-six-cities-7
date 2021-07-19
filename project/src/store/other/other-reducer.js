import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType } from '../action';
import { City, SortType } from '../../constant.js';

const initialState = {
  city: City.PARIS,
  sortType: SortType.POPULAR,
};

export const otherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, ((state, action) => {
      state.city = action.payload;
    }))
    .addCase(changeSortType, ((state, action) => {
      state.sortType = action.payload;
    }));
});
