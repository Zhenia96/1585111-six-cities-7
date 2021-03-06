import { ActionType } from '../constant.js';
import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const changeSortType = createAction(ActionType.CHANGE_SORT_TYPE, (sortType) => ({
  payload: sortType,
}));

export const changeHotels = createAction(ActionType.CHANGE_HOTELS, (hotels) => ({
  payload: hotels,
}));

export const changeFavoriteStatus = createAction(ActionType.CHANGE_FAVORITE_STATUS, (id) => ({
  payload: id,
}));

export const changeHotelsLoadingStatus = createAction(ActionType.CHANGE_HOTELS_LOADING_STATUS, (loadingStatus) => ({
  payload: loadingStatus,
}));

export const login = createAction(ActionType.LOGIN, (user) => ({
  payload: user,
}));

export const logout = createAction(ActionType.LOGOUT);

export const setErrorMessage = createAction(ActionType.SET_ERROR_MESSAGE, (message) => ({
  payload: message,
}));
