import PropTypes from 'prop-types';

export const userProps = PropTypes.shape({
  email: PropTypes.string.isRequired,
  password: PropTypes.string,
});

export const hostProps = PropTypes.shape({
  avatarUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
});

export const reviewProps = PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: hostProps,
});

export const locationProps = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
});

export const cityProps = PropTypes.shape({
  location: locationProps,
  name: PropTypes.string.isRequired,
});

export const hotelProps = PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  city: cityProps,
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: hostProps,
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: locationProps,
  maxAdults: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
