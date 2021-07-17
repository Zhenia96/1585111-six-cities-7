import { AppPath } from '../../constant.js';
import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import RoomPage from '../room-page/room-page.jsx';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../private-route/private-route.jsx';

function mapStateToProps(state) {
  return {
    hotels: state.hotels,
  };
}

function App(props) {
  const { hotels, api } = props;

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
              hotels={hotels}
            />
          )}
        />
        <Route path={AppPath.FAVORITES} exact>
          <FavoritesPage hotels={hotels} />
        </Route>
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
  hotels: PropTypes.array.isRequired,
  api: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(App);
