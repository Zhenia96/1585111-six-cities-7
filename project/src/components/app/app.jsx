import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';

export default function App(props) {
  const { hotels } = props;
  return <MainPage hotels={hotels} />;
}

App.propTypes = {
  hotels: PropTypes.array.isRequired,
};
