import { CardType } from '../../constant.js';
import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import { hotelProps } from '../../utils/prop-validation';

function getFavoriteCard(hotel, city, api) {
  if (hotel.city.name === city && hotel.isFavorite) {
    return <PlaceCard key={hotel.id} hotel={hotel} cardType={CardType.FAVORITES} api={api} ></PlaceCard >;
  }
}

export default function FavoritesCity({ hotels, city, api }) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {hotels.map((hotel) => getFavoriteCard(hotel, city, api))}
      </div>
    </li>
  );
}

FavoritesCity.propTypes = {
  hotels: PropTypes.arrayOf(hotelProps).isRequired,
  city: PropTypes.string.isRequired,
  api: PropTypes.func.isRequired,
};
