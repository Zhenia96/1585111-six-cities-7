import React from 'react';
import PropTypes from 'prop-types';
import { CardType } from '../../constant';
import PlaceCard from '../place-card/place-card';
import { hotelProps } from '../../utils/prop-validation';


export default function NearestHotels({ nearestHotels }) {

  return (
    <div className="near-places__list places__list">
      {nearestHotels.map((hotel) => <PlaceCard key={hotel.id} hotel={hotel} cardType={CardType.NEAR}></PlaceCard>)}
    </div>
  );
}

NearestHotels.propTypes = {
  nearestHotels: PropTypes.arrayOf(hotelProps).isRequired,
};
