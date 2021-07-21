import { AppPath, ServerPath } from '../../constant.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header.jsx';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import FavoritesContent from '../favorites-content/favorites-content.jsx';
import FavoritesContentEmpty from '../favorites-content-empty/favorites-content-empty.jsx';
import { adaptHotelsToClient } from '../../utils/adapter';


export default function FavoritesPage({ api }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    let isUnmount = false;
    setIsLoaded(false);
    api.get(ServerPath.FAVORITE)
      .then((response) => {
        if (!isUnmount) {
          const adaptedHotels = adaptHotelsToClient(response.data);
          setHotels(adaptedHotels);
          setIsLoaded(true);
        }
      })
      .catch(() => {
        if (!isUnmount) {
          setIsLoaded(true);
        }
      });

    return () => isUnmount = true;
  }, [api, setHotels, setIsLoaded]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {hotels.length ?
            <FavoritesContent hotels={hotels} /> :
            <FavoritesContentEmpty />}
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
  api: PropTypes.func.isRequired,
};

