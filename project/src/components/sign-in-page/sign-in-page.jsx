import React, { useState } from 'react';
import { AppPath, AuthorizationStatus } from '../../constant.js';
import { Link, Redirect } from 'react-router-dom';
import { apiActionCreator } from '../../store/api-action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header.jsx';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getCity } from '../../store/other/selectors';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (email, password) => (
      dispatch(apiActionCreator.login({ email, password }))
    ),
  };
}

function mapStateToProps(state) {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    city: getCity(state),
  };
}

function SignInPage({ onSubmit, authorizationStatus, city }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppPath.MAIN} />;
  }

  function handleEmailChange({ target }) {
    setEmail(target.value);
  }

  function handlePasswordChange({ target }) {
    setPassword(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (password.trim() && email.trim()) {
      onSubmit(email, password);
    }
  }

  return (
    <div className="page page--gray page--login">
      <PageHeader />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" value={email} onChange={handleEmailChange} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" value={password} onChange={handlePasswordChange} />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppPath.MAIN}>
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

SignInPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
