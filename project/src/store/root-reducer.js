import { combineReducers } from 'redux';
import { NameSpace } from '../constant.js';
import { userReducer } from './user/user-reducer.js';
import { otherReducer } from './other/other-reducer.js';
import { hotelsReducer } from './hotels/hotels-reducer.js';

export const rootReducer = combineReducers({
  [NameSpace.HOTELS]: hotelsReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.OTHER]: otherReducer,
});
