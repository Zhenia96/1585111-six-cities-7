import React from 'react';
import RoomImage from '../room-image/room-image';
import PropTypes from 'prop-types';

const MAX_IMAGES_COUNT = 6;

function sliceImages(images, maxImagesCount) {
  let slicedImages = images;
  if (images.length > maxImagesCount) {
    slicedImages = images.slice(0, maxImagesCount);
  }
  return slicedImages;
}

export default function RoomGallery({ images }) {
  const slicedImages = sliceImages(images, MAX_IMAGES_COUNT);
  return (
    <div className="property__gallery">
      {slicedImages.map((image) => <RoomImage key={`id-${image}`} image={image} />)}
    </div>
  );
}

RoomGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
