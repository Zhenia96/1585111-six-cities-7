import { AppPath } from '../../constant.js';
import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import RoomPage from '../room-page/room-page.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route.jsx';
import ErrorPage from '../error-page/error-page.jsx';

export default function App(props) {

  const { api } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppPath.MAIN} exact>
          <MainPage api={api} />
        </Route>
        <Route path={AppPath.LOGIN} exact>
          <SignInPage />
        </Route>
        <PrivateRoute
          exact
          path={AppPath.FAVORITES}
          render={() => (
            <FavoritesPage
              api={api}
            />
          )}
        />
        <Route path={`${AppPath.OFFER}/:id`} exact>
          <RoomPage api={api} />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  api: PropTypes.func.isRequired,
};
