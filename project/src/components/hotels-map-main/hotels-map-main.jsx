import React from 'react';
import HotelsMap from '../hotels-map/hotels-map.jsx';
import PropTypes from 'prop-types';

export default function MapMain({ hotels, activeHotel }) {
  return (
    <section className="cities__map map">
      <HotelsMap hotels={hotels} activeHotel={activeHotel} />
    </section>
  );
}

MapMain.propTypes = {
  hotels: PropTypes.array.isRequired,
  activeHotel: PropTypes.object,
};
