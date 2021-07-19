import { createReducer } from '@reduxjs/toolkit';
import { login, logout } from '../action';
import { AuthorizationStatus } from '../../constant.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, ((state, action) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
      state.user = action.payload;
    }))
    .addCase(logout, ((state, action) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = null;
    }));
});
