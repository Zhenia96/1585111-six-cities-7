import { AppPath } from '../../constant.js';
import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import RoomPage from '../room-page/room-page.jsx';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from '../private-route/private-route.jsx';
import { getHotels } from '../../store/hotels/selectors';


export default function App(props) {
  const hotels = useSelector(getHotels);

  const { api } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppPath.MAIN} exact>
          <MainPage hotels={hotels} />
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
          <RoomPage hotels={hotels} api={api} />
        </Route>
        <Route>
          <React.Fragment>
            <h1>Error 404</h1>
            <Link to={AppPath.MAIN}>Go to main page</Link>
          </React.Fragment>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  api: PropTypes.func.isRequired,
};
