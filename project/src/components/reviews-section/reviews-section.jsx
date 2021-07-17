import React, { useState, useEffect } from 'react';
import Comment from '../comment/comment';
import ReviewList from '../review-list/review-list';
import { ServerPath, AuthorizationStatus, SHOWN_REVIEWS_COUNT } from '../../constant';
import { adaptReviewsToClient } from '../../utils/adapter';
import { sortReviews, sliceReviews } from '../../utils/common';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorScreen from '../error-screen/error-screen';

const ERROR_MESSAGE = 'Error';
const ERROR_TIMEOUT = 5000;

function mapStateToProps(state) {
  return {
    authorizationStatus: state.authorizationStatus,
  };
}

function ReviewsSection({ id, api, authorizationStatus }) {
  const [reviews, setReviews] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isUnmount = false;
    api.get(`${ServerPath.COMMENTS}/${id}`)
      .then((response) => {
        if (!isUnmount) {
          const adaptedReviews = adaptReviewsToClient(response.data);
          const sortedReviews = sortReviews(adaptedReviews);
          setReviews(sliceReviews(sortedReviews, SHOWN_REVIEWS_COUNT));
        }
      })
      .catch(() => {
        if (!isUnmount) {
          setIsError(true);
          setTimeout(() => setIsError(false), ERROR_TIMEOUT);
        }
      });
    return () => isUnmount = true;
  }, [api, id]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {isError ?
        <ErrorScreen errorMessage={ERROR_MESSAGE} /> :
        <ReviewList reviews={reviews} />}
      {authorizationStatus === AuthorizationStatus.AUTH ?
        <Comment id={id} api={api} resetReviews={setReviews} /> :
        ''}
    </section>
  );
}

ReviewsSection.propTypes = {
  id: PropTypes.string.isRequired,
  api: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ReviewsSection);