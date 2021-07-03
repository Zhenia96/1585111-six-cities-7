import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMap from '../../hooks/use-map';

function getIcon(isActive = false) {
  const iconUrl = isActive ? 'img/pin-active.svg' : 'img/pin.svg';
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

export default function Map({ hotels, activeHotel }) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, getCityLocation(hotels));

  useEffect(() => {
    if (map && activeHotel) {
      const { location } = activeHotel;
      const isActiveCard = true;
      Leaflet.marker([location.latitude, location.longitude], { icon: getIcon(isActiveCard) }).addTo(map);
    }
  }, [activeHotel, map]);

  useEffect(() => {
    if (map) {
      hotels.forEach((hotel) => {
        const { location } = hotel;
        const isActiveCard = false;
        if (hotel !== activeHotel) {
          Leaflet.marker([location.latitude, location.longitude], { icon: getIcon(isActiveCard) }).addTo(map);
        }
      });
    }
  }, [activeHotel, map, hotels]);

  return (
    <div ref={mapRef} id='map' style={{ height: '100%' }}></div>
  );
}


Map.propTypes = {
  hotels: PropTypes.array.isRequired,
  activeHotel: PropTypes.object,
};
