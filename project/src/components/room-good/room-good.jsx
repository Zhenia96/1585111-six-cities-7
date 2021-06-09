import React from 'react';
import PropTypes from 'prop-types';

export default function RoomGood({ good }) {
  return (
    <li className="property__inside-item">
      {good}
    </li>
  );
}

RoomGood.propTypes = {
  good: PropTypes.string.isRequired,
};
