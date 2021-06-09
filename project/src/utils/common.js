const MAX_RATING = 5;

export function getPercentageRating(rating) {
  return `${100 * (rating / MAX_RATING)}%`;
}

export function getTextWithCapitalFirstLetter(text) {
  const result = text[0].toUpperCase() + text.slice(1);
  return result;
}
