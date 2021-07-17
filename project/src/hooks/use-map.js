import Leaflet from 'leaflet';
import { useState, useEffect } from 'react';

export default function useMap(mapRef, city) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map === null) {
      const instance = Leaflet.map(mapRef.current, city);

      Leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(instance);

      setMap(instance);
    }
    else {
      map.setView(city.center, city.zoom);
    }
  }, [map, mapRef, city]);

  return map;
}
