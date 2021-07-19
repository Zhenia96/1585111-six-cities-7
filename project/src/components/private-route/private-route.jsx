import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ServerPath, AuthorizationStatus } from '../../constant';
import { getAuthorizationStatus } from '../../store/user/selectors';


function PrivateRoute({ render, path, exact, authorizationStatus }) {
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
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
