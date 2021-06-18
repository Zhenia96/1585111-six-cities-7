import { AppPath } from '../../constant.js';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritesCity from '../favorites-city/favorites-city.jsx';
import PageHeader from '../page-header/page-header.jsx';

function getUnicCities(hotels) {
  const unicCities = new Set();
  hotels.forEach((hotel) => {
    if (hotel.isFavorite) {
      unicCities.add(hotel.city.name);
    }
  });
  return unicCities;
}

export default function FavoritesPage({ hotels, user }) {
  const unicCities = Array.from(getUnicCities(hotels).values());

  return (
    <div className="page">
      <PageHeader user={user} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {unicCities.map((city) => <FavoritesCity key={`id-${city}`} hotels={hotels} city={city}></FavoritesCity>)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppPath.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

FavoritesPage.propTypes = {
  hotels: PropTypes.array.isRequired,
  user: PropTypes.object,
};
