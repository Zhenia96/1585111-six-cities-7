import React from 'react';
import Map from '../map/map.jsx';
import PropTypes from 'prop-types';

export default function MapMain({ hotels, activeHotel }) {
  return (
    <section className="cities__map map">
      <Map hotels={hotels} activeHotel={activeHotel} />
    </section>
  );
}

MapMain.propTypes = {
  hotels: PropTypes.array.isRequired,
  activeHotel: PropTypes.object,
};
