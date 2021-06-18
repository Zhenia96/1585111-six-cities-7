import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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
