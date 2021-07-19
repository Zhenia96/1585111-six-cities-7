import React from 'react';
import { Link } from 'react-router-dom';
import { AppPath, AuthorizationStatus } from '../../constant.js';
import PropTypes from 'prop-types';
import { apiActionCreator } from '../../store/api-action';
import { connect } from 'react-redux';
import NavigationLogged from '../navigation-logged/navigation-logged.jsx';
import NavigationNotLogged from '../navigation-not-logged/navigation-not-logged.jsx';
import { getUser, getAuthorizationStatus } from '../../store/user/selectors';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (email, password) => (
      dispatch(apiActionCreator.login({ email, password }))
    ),
  };
}

function mapStateToProps(state) {
  return {
    user: getUser(state),
    authorizationStatus: getAuthorizationStatus(state),
  };
}

function PageHeader({ user, authorizationStatus }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppPath.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {authorizationStatus === AuthorizationStatus.AUTH ?
            <NavigationLogged user={user} /> :
            <NavigationNotLogged />}
        </div>
      </div>
    </header>
  );
}

PageHeader.propTypes = {
  user: PropTypes.object,
  authorizationStatus: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
