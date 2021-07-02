import { ActionType, City } from '../constant.js';

const initialState = {
  city: City.AMSTERDAM,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
}
