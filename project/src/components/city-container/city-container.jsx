import React, { useEffect } from 'react';
import CityHotels from '../city-hotels/city-hotels.jsx';
import CityNoHotels from '../city-no-hotels/city-no-hotels.jsx';
import PropTypes from 'prop-types';
import HotelsMapMain from '../hotels-map-main/hotels-map-main.jsx';
import { hotelProps } from '../../utils/prop-validation.js';

export default function CityContainer({ hotels, city, onCardMouseOver, activeHotel, changeEmptyStatus, api }) {
  useEffect(() => {
    changeEmptyStatus(Boolean(hotels.length));
  }, [hotels, changeEmptyStatus]);

  return (
    <div className="cities__places-container container">
      {hotels.length ?
        <CityHotels hotels={hotels} city={city} onCardMouseOver={onCardMouseOver} api={api} /> :
        <CityNoHotels city={city} />}
      <div className="cities__right-section">
        {hotels.length ?
          <HotelsMapMain activeHotel={activeHotel} hotels={hotels} /> :
          ''}
      </div>
    </div>
  );
}

CityContainer.propTypes = {
  hotels: PropTypes.arrayOf(hotelProps).isRequired,
  city: PropTypes.string,
  onCardMouseOver: PropTypes.func.isRequired,
  activeHotel: PropTypes.object,
  changeEmptyStatus: PropTypes.func.isRequired,
  api: PropTypes.func.isRequired,
};
