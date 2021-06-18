import React from 'react';
import CityHotels from '../city-hotels/city-hotels.jsx';
import CityEmpty from '../city-empty/city-empty.jsx';
import PropTypes from 'prop-types';

export default function CityContainer({ hotels, city, onCardMouseOver }) {
  return (
    <div className="cities__places-container container">
      {hotels.length ?
        <CityHotels hotels={hotels} city={city} onCardMouseOver={onCardMouseOver} /> :
        <CityEmpty />}
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

CityContainer.propTypes = {
  hotels: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
};
