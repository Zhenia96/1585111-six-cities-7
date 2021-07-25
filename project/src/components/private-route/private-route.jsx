import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ServerPath, AuthorizationStatus } from '../../constant';
import { getAuthorizationStatus } from '../../store/user/selectors';

export default function PrivateRoute({ render, path, exact }) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => authorizationStatus === AuthorizationStatus.AUTH
        ? render()
        : <Redirect to={ServerPath.LOGIN} />}
    />
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};
