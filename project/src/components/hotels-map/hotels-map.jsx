import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMap from '../../hooks/use-map';
import { hotelProps } from '../../utils/prop-validation';

const IconUrl = {
  DEFAULT: 'img/pin.svg',
  ACTIVE: 'img/pin-active.svg',
};

function getIcon(isActive) {
  const iconUrl = isActive ? IconUrl.ACTIVE : IconUrl.DEFAULT;
  return Leaflet.icon({
    iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

function getCityLocation(hotels) {
  const city = hotels[0].city;
  const { latitude, longitude, zoom } = city.location;

  return {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom,
  };
}

export default function HotelsMap({ activeHotel, hotels }) {
  const mapRef = useRef(null);

  const map = useMap(mapRef, getCityLocation(hotels));

  useEffect(() => {
    if (map) {
      hotels.forEach((hotel) => {
        const { location } = hotel;
        const isActiveCard = activeHotel ? hotel.id === activeHotel.id : false;
        Leaflet.marker([location.latitude, location.longitude], { icon: getIcon(isActiveCard) }).addTo(map);
      });
    }
  }, [activeHotel, map, hotels]);

  return (
    <div ref={mapRef} id='map' style={{ height: '100%' }}></div>
  );
}

HotelsMap.propTypes = {
  activeHotel: hotelProps,
  hotels: PropTypes.arrayOf(hotelProps).isRequired,
};
