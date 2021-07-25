export const SHOWN_REVIEWS_COUNT = 10;

export const CardType = {
  FAVORITES: 'favorites',
  CITIES: 'cities',
  NEAR: 'near-places',
};

export const DateFormat = {
  ATTRIBUTE: 'YYYY-MM-DD',
  MONTH_YEAR: 'MMMM YYYY',
};

export const AppPath = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
  ERROR: '/error',
};

export const ActionType = {
  CHANGE_CITY: 'changeCity',
  CHANGE_HOTELS: 'changeHotels',
  CHANGE_FAVORITE_STATUS: 'changeFavoriteStatus',
  CHANGE_SORT_TYPE: 'changeSortType',
  CHANGE_HOTELS_LOADING_STATUS: 'changeHotelsLoadingStatus',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SET_ERROR_MESSAGE: 'setErrorMessage',
};

export const City = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

export const SortType = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  RAITING_HIGH_TO_LOW: 'Top rated first',
};

export const ServerPath = {
  HOTELS: '/hotels',
  FAVORITE: '/favorite',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const AuthorizationStatus = {
  NO_AUTH: 'noAuth',
  AUTH: 'auth',
  UNKNOWN: 'unknown',
};


export const ResponseStatus = {
  OK: 200,
  BAD: 400,
  NO_AUTH: 401,
};

export const NameSpace = {
  USER: 'user',
  OTHER: 'other',
  HOTELS: 'hotels',
};

export const ClassName = {
  PROPERTY: 'property',
  PLACE_CARD: 'place-card',
};
