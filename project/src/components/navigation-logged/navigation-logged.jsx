import React from 'react';
import { Link } from 'react-router-dom';
import { AppPath } from '../../constant.js';
import { signOut } from '../../store/api-action.js';
import { useDispatch } from 'react-redux';
import { userProps } from '../../utils/prop-validation';

export default function NavigationLogged({ user }) {
  const dispatch = useDispatch();

  function handleSignOutClick(evt) {
    evt.preventDefault();
    dispatch(signOut());
  }

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
          <a className="header__nav-link" onClick={handleSignOutClick} href='/'>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

NavigationLogged.propTypes = {
  user: userProps,
};
