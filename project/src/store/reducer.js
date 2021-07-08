import { ActionType, City, SortType } from '../constant.js';

const initialState = {
  city: City.AMSTERDAM,
  sortType: SortType.POPULAR,
  hotels: [],
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
    default:
      return state;
  }
}