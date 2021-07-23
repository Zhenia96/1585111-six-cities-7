import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, setErrorMessage } from '../action';
import { City, SortType } from '../../constant.js';

const initialState = {
  city: City.PARIS,
  sortType: SortType.POPULAR,
  errorMessage: '',
};

export const otherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, ((state, action) => {
      state.city = action.payload;
    }))
    .addCase(changeSortType, ((state, action) => {
      state.sortType = action.payload;
    }))
    .addCase(setErrorMessage, ((state, action) => {
      state.errorMessage = action.payload;
    }));
});
