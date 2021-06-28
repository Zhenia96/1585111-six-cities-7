import React, { useEffect } from 'react';
import CityHotels from '../city-hotels/city-hotels.jsx';
import CityEmpty from '../city-empty/city-empty.jsx';
import PropTypes from 'prop-types';
import MapMain from '../map-main/map-main.jsx';

export default function CityContainer({ hotels, city, onCardMouseOver, activeHotel, changeEmptyStatus }) {
  useEffect(() => {
    changeEmptyStatus(Boolean(hotels.length));
  }, [hotels, changeEmptyStatus]);

  return (
    <div className="cities__places-container container">
      {hotels.length ?
        <CityHotels hotels={hotels} city={city} onCardMouseOver={onCardMouseOver} /> :
        <CityEmpty />}
      <div className="cities__right-section">
        {hotels.length ?
          <MapMain hotels={hotels} activeHotel={activeHotel} /> :
          ''}
      </div>
    </div>
  );
}

CityContainer.propTypes = {
  hotels: PropTypes.array.isRequired,
  city: PropTypes.string,
  onCardMouseOver: PropTypes.func.isRequired,
  activeHotel: PropTypes.object,
  changeEmptyStatus: PropTypes.func.isRequired,
};
