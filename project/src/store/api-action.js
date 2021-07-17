import { ServerPath, ResponseStatus } from '../constant.js';
import { actionCreator } from './action.js';
import { adaptHotelsToClient, adaptAuthInfoToClient } from '../utils/adapter.js';

export const apiActionCreator = {
  getHotels: () => async (dispatch, getState, api) => {
    dispatch(actionCreator.changeHotelsLoadingStatus(false));
    let response;
    try {
      response = await api.get(ServerPath.HOTELS);
      dispatch(actionCreator.changeHotels(adaptHotelsToClient(response.data)));
      dispatch(actionCreator.changeHotelsLoadingStatus(true));
    } catch (error) {
      return error;
    }
  },
  login: ({ email, password }) => async (dispatch, getState, api) => {
    let response;
    try {
      response = await api.post(ServerPath.LOGIN, { email, password });
      localStorage.setItem('token', response.data.token);
      api.defaults.headers['X-Token'] = response.data.token;
      dispatch(actionCreator.login(adaptAuthInfoToClient(response.data)));
    } catch (error) {
      return error;
    }
  },
  logout: () => async (dispatch, getState, api) => {
    try {
      await api.delete(ServerPath.LOGOUT);
      localStorage.removeItem('token');
      api.defaults.headers['X-Token'] = '';
      dispatch(actionCreator.logout());
    } catch (error) {
      return error;
    }
  },
  getAuthorizationStatus: () => async (dispatch, getState, api) => {
    let response;
    try {
      response = await api.get(ServerPath.LOGIN);
      if (response.status === ResponseStatus.OK) {
        dispatch(actionCreator.login(adaptAuthInfoToClient(response.data)));
      }
    } catch (error) {
      dispatch(actionCreator.logout());
    }
  },
};
