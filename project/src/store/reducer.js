import { ActionType, City, SortType, AuthorizationStatus } from '../constant.js';

const initialState = {
  city: City.PARIS,
  sortType: SortType.POPULAR,
  hotels: [],
  hotelsLoadingStatus: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case ActionType.CHANGE_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    case ActionType.CHANGE_HOTELS_LOADING_STATUS:
      return {
        ...state,
        hotelsLoadingStatus: action.payload,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.AUTH,
        user: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: null,
      };
    default:
      return state;
  }
}
