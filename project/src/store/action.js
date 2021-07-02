import { actionType } from '../../constant.js';

export const createAction = {
  changeCity: (city) => ({
    type: actionType.CHANGE_CITY,
    payload: city,
  }),
};
