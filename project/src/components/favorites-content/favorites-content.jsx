import React from 'react';
import PropTypes from 'prop-types';
import FavoritesCity from '../favorites-city/favorites-city.jsx';
import { hotelProps } from '../../utils/prop-validation';

function getUnicCities(hotels) {
  const unicCities = new Set();
  hotels.forEach((hotel) => {
    if (hotel.isFavorite) {
      unicCities.add(hotel.city.name);
    }
  });
  return unicCities;
}

export default function FavoritesContent({ hotels, api }) {
  const unicCities = Array.from(getUnicCities(hotels).values());

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {unicCities.map((city) => <FavoritesCity key={`id-${city}`} hotels={hotels} city={city} api={api}></FavoritesCity>)}
      </ul>
    </section>
  );
}

FavoritesContent.propTypes = {
  hotels: PropTypes.arrayOf(hotelProps).isRequired,
  api: PropTypes.func.isRequired,
};
