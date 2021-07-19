import React from 'react';
import { Link } from 'react-router-dom';
import { AppPath, AuthorizationStatus } from '../../constant.js';
import { useSelector } from 'react-redux';
import NavigationLogged from '../navigation-logged/navigation-logged.jsx';
import NavigationNotLogged from '../navigation-not-logged/navigation-not-logged.jsx';
import { getUser, getAuthorizationStatus } from '../../store/user/selectors';

export default function PageHeader() {
  const user = useSelector(getUser);
  const authorizationStatus = useSelector(getAuthorizationStatus);

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
