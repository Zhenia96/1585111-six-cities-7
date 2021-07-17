import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function ErrorScreen({ errorMessage }) {
  return (
    <div className='error'>
      <p className='error__text'>{errorMessage}</p>
    </div>
  );
}

ErrorScreen.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

