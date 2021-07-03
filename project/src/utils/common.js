import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SortType } from '../constant.js';

dayjs.extend(customParseFormat);


const MAX_RATING = 5;

export function getPercentageRating(rating) {
  return `${100 * ((Math.round(rating)) / MAX_RATING)}%`;
}

export function getTextWithCapitalFirstLetter(text) {
  const result = text[0].toUpperCase() + text.slice(1);
  return result;
}

export function createDate(date) {
  return dayjs(date);
}

export function getFormatedDate(date, format) {
  return dayjs(date).format(format);
}

export function sortHotels(hotels, sortType) {
  const sortedHotels = hotels.slice();

  switch (sortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return sortedHotels.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    case SortType.PRICE_HIGH_TO_LOW:
      return sortedHotels.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    case SortType.RAITING_HIGH_TO_LOW:
      return sortedHotels.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      });

    default:
      return hotels;
  }
}
