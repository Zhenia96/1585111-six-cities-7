import { ServerPath } from '../constant.js';
import { actionCreator } from './action.js';
import { adaptHotelsToClient } from '../utils/adapter.js';

export const apiActionCreator = {
  getHotels: () => async (dispatch, getState, api) => {
    const { data } = await api.get(ServerPath.HOTELS);
    dispatch(actionCreator.changeHotels(adaptHotelsToClient(data)));
  },
};