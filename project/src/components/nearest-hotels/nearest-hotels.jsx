import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ServerPath, CardType } from '../../constant';
import PlaceCard from '../place-card/place-card';
import { adaptHotelsToClient } from '../../utils/adapter';

const MAX_SHOWN_HOTELS = 3;

function sliceHotels(hotels, maxCount) {
  if (hotels.length >= maxCount) {
    return hotels.slice(0, maxCount);
  }

  return hotels;
}

export default function NearestHotels({ id, api }) {
  const [hotels, setHotels] = useState([]);


  useEffect(() => {
    let isUnmount = false;
    api.get(`${ServerPath.HOTELS}/${id}/nearby`)
      .then((response) => {
        if (!isUnmount) {
          const adaptedHotels = adaptHotelsToClient(response.data);
          const slicedHotels = sliceHotels(adaptedHotels, MAX_SHOWN_HOTELS);
          setHotels(slicedHotels);
        }
      })
      .catch(() => {
        if (!isUnmount) {
          setHotels([]);
        }
      });
    return () => isUnmount = true;
  }, [api, id, setHotels]);


  return (
    <div className="near-places__list places__list">
      {hotels.map((hotel) => <PlaceCard key={hotel.id} hotel={hotel} cardType={CardType.NEAR}></PlaceCard>)}
    </div>
  );
}

NearestHotels.propTypes = {
  id: PropTypes.string.isRequired,
  api: PropTypes.func.isRequired,
};
