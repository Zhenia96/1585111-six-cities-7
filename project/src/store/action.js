import { ActionType } from '../constant.js';

export const actionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  changeHotels: (hotels) => ({
    type: ActionType.CHANGE_HOTELS,
    payload: hotels,
  }),
};
