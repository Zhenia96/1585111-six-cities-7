import { AppPath, ServerPath } from '../../constant.js';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../page-header/page-header.jsx';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import FavoritesContent from '../favorites-content/favorites-content.jsx';
import FavoritesContentEmpty from '../favorites-content-empty/favorites-content-empty.jsx';
import { adaptHotelsToClient } from '../../utils/adapter';
import { ApiContext } from '../../context/context.js';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../../store/action.js';


export default function FavoritesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState([]);

  const dispatch = useDispatch();

  const api = useContext(ApiContext);

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
      .catch(({ response }) => {
        if (!isUnmount) {
          dispatch(setErrorMessage(response.statusText));
          setIsLoaded(true);
        }
      });

    return () => isUnmount = true;
  }, [api, setHotels, setIsLoaded, dispatch]);

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
