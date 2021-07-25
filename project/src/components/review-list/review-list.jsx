import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import { reviewProps } from '../../utils/prop-validation';

export default function ReviewList({ reviews }) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <Review key={review.id} review={review} />)}
    </ul>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProps).isRequired,
};
