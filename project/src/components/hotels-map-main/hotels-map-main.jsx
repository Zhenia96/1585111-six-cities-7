import React from 'react';
import HotelsMap from '../hotels-map/hotels-map.jsx';
import PropTypes from 'prop-types';

export default function MapMain({ activeHotel, hotels }) {
  return (
    <section className="cities__map map">
      <HotelsMap activeHotel={activeHotel} hotels={hotels} />
    </section>
  );
}

MapMain.propTypes = {
  activeHotel: PropTypes.object,
  hotels: PropTypes.array.isRequired,
};
