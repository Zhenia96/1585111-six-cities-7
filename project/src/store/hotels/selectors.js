import { createSelector } from 'reselect';
import { NameSpace } from '../../constant.js';
import { getSortType } from '../other/selectors.js';
import { getCity } from '../other/selectors.js';
import { filterHotels, sortHotels } from '../../utils/common.js';

export const getHotels = (state) => state[NameSpace.HOTELS].hotels;

export const getHotelsLoadingStatus = (state) => state[NameSpace.HOTELS].hotelsLoadingStatus;

export const getSortedHotels = createSelector(
  [getHotels, getSortType, getCity],
  (hotelsData, sortTypeData, cityData) => {
    const filteredHotels = filterHotels(hotelsData, cityData);
    return sortHotels(filteredHotels, sortTypeData);
  });
