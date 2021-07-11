import React from 'react';
import { Link } from 'react-router-dom';
import { AppPath } from '../../constant.js';
import PropTypes from 'prop-types';
import { apiActionCreator } from '../../store/api-action.js';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    onSignOut: (evt) => {
      evt.preventDefault();
      dispatch(apiActionCreator.logout());
    },
  };
}

function NavigationLogged({ user, onSignOut }) {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppPath.FAVORITES}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{user.email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" onClick={onSignOut} href='/'>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

NavigationLogged.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  onSignOut: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NavigationLogged);
