import React from 'react';
import PropTypes from 'prop-types';

export default function RoomImage({ image }) {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={image} alt="Studio" />
    </div>
  );
}

RoomImage.propTypes = {
  image: PropTypes.string.isRequired,
};
