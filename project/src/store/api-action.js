import { ServerPath, ResponseStatus } from '../constant.js';
import { changeHotelsLoadingStatus, changeHotels, logout, login, setErrorMessage } from './action.js';
import { adaptHotelsToClient, adaptAuthInfoToClient } from '../utils/adapter.js';

export const getHotels = () => (dispatch, getState, api) => {
  dispatch(changeHotelsLoadingStatus(false));
  api.get(ServerPath.HOTELS)
    .then((response) => {
      dispatch(changeHotels(adaptHotelsToClient(response.data)));
      dispatch(changeHotelsLoadingStatus(true));
    })
    .catch(({ response }) => {
      dispatch(setErrorMessage(response.statusText));
    });
};


export const signIn = ({ email, password }) => (dispatch, getState, api) => {
  api.post(ServerPath.LOGIN, { email, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers['X-Token'] = response.data.token;
      dispatch(login(adaptAuthInfoToClient(response.data)));
      dispatch(getHotels());
    })
    .catch(({ response }) => {
      dispatch(setErrorMessage(response.statusText));
    });
};

export const signOut = () => (dispatch, getState, api) => {
  api.delete(ServerPath.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      api.defaults.headers['X-Token'] = '';
      dispatch(logout());
    })
    .catch(({ response }) => {
      dispatch(setErrorMessage(response.statusText));
    });
};

export const checkAuthorizationStatus = () => (dispatch, getState, api) => {
  api.get(ServerPath.LOGIN)
    .then((response) => {
      if (response.status === ResponseStatus.OK) {
        dispatch(login(adaptAuthInfoToClient(response.data)));
      }
    })
    .catch(({ response }) => {
      dispatch(setErrorMessage(response.statusText));
      dispatch(logout());
    });
};
