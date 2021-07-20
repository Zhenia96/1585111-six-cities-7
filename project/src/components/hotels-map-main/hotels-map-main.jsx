import React from 'react';
import HotelsMap from '../hotels-map/hotels-map.jsx';
import PropTypes from 'prop-types';

export default function MapMain({ activeHotel }) {
  return (
    <section className="cities__map map">
      <HotelsMap activeHotel={activeHotel} />
    </section>
  );
}

MapMain.propTypes = {
  activeHotel: PropTypes.object,
};
