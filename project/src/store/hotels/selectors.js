import { NameSpace } from '../../constant.js';

export const getHotels = (state) => state[NameSpace.HOTELS].hotels;

export const getHotelsLoadingStatus = (state) => state[NameSpace.HOTELS].hotelsLoadingStatus;
