import { NameSpace } from '../../constant.js';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getUser = (state) => state[NameSpace.USER].user;
