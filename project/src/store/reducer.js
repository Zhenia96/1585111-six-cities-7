import { ActionType, City, SortType } from '../constant.js';

const initialState = {
  city: City.AMSTERDAM,
  sortType: SortType.POPULAR,
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
    default:
      return state;
  }
}
