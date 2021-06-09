import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import RoomPage from '../room-page/room-page.jsx';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default function App(props) {
  const { hotels } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <MainPage hotels={hotels} />
        </Route>
        <Route path='/login' exact>
          <SignInPage />
        </Route>
        <Route path='/favorites' exact>
          <FavoritesPage hotels={hotels} />
        </Route>
        <Route path='/offer/:id' exact>
          <RoomPage hotels={hotels} />
        </Route>
        <Route>
          <React.Fragment>
            <h1>Error 404</h1>
            <Link to='/'>Go to main page</Link>
          </React.Fragment>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  hotels: PropTypes.array.isRequired,
};
