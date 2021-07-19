import { NameSpace } from '../../constant.js';

export const getCity = (state) => state[NameSpace.OTHER].city;

export const getSortType = (state) => state[NameSpace.OTHER].sortType;
