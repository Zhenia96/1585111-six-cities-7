import React from 'react';
import PlaceCard from '../place-card/place-card';
import { CardType } from '../../constant.js';
import PropTypes from 'prop-types';
import SortMenu from '../sort-menu/sort-menu.jsx';
import { hotelProps } from '../../utils/prop-validation';


export default function CityHotels({ hotels, city, onCardMouseOver }) {
  const hotelsCount = hotels.length;
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{hotelsCount} places to stay in {city}</b>
      <SortMenu></SortMenu>
      <div className="cities__places-list places__list tabs__content">
        {(hotels.map((hotel) => (<PlaceCard key={hotel.id} hotel={hotel} cardType={CardType.CITIES} onCardMouseOver={onCardMouseOver}></PlaceCard>)))}
      </div>
    </section>
  );
}

CityHotels.propTypes = {
  hotels: PropTypes.arrayOf(hotelProps).isRequired,
  city: PropTypes.string.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
};
