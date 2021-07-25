import React from 'react';
import HotelsMap from '../hotels-map/hotels-map.jsx';
import PropTypes from 'prop-types';
import { hotelProps } from '../../utils/prop-validation';

export default function MapMain({ activeHotel, hotels }) {
  return (
    <section className="cities__map map">
      <HotelsMap activeHotel={activeHotel} hotels={hotels} />
    </section>
  );
}

MapMain.propTypes = {
  activeHotel: hotelProps,
  hotels: PropTypes.arrayOf(hotelProps).isRequired,
};
