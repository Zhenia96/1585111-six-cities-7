import { ServerPath, ResponseStatus } from '../constant.js';
import { changeHotelsLoadingStatus, changeHotels, logout, login } from './action.js';
import { adaptHotelsToClient, adaptAuthInfoToClient } from '../utils/adapter.js';

export const apiActionCreator = {
  getHotels: () => async (dispatch, getState, api) => {
    dispatch(changeHotelsLoadingStatus(false));
    let response;
    try {
      response = await api.get(ServerPath.HOTELS);
      dispatch(changeHotels(adaptHotelsToClient(response.data)));
      dispatch(changeHotelsLoadingStatus(true));
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
      dispatch(login(adaptAuthInfoToClient(response.data)));
    } catch (error) {
      return error;
    }
  },
  logout: () => async (dispatch, getState, api) => {
    try {
      await api.delete(ServerPath.LOGOUT);
      localStorage.removeItem('token');
      api.defaults.headers['X-Token'] = '';
      dispatch(logout());
    } catch (error) {
      return error;
    }
  },
  getAuthorizationStatus: () => async (dispatch, getState, api) => {
    let response;
    try {
      response = await api.get(ServerPath.LOGIN);
      if (response.status === ResponseStatus.OK) {
        dispatch(login(adaptAuthInfoToClient(response.data)));
      }
    } catch (error) {
      dispatch(logout());
    }
  },
};
