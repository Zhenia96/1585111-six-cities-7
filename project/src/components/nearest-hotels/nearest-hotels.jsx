import React from 'react';
import PropTypes from 'prop-types';
import { CardType } from '../../constant';
import PlaceCard from '../place-card/place-card';


export default function NearestHotels({ api, nearestHotels }) {

  return (
    <div className="near-places__list places__list">
      {nearestHotels.map((hotel) => <PlaceCard key={hotel.id} hotel={hotel} cardType={CardType.NEAR} api={api}></PlaceCard>)}
    </div>
  );
}

NearestHotels.propTypes = {
  api: PropTypes.func.isRequired,
  nearestHotels: PropTypes.array.isRequired,
};
