import React, { useState, useEffect, useContext } from 'react';
import Comment from '../comment/comment';
import ReviewList from '../review-list/review-list';
import { ServerPath, AuthorizationStatus, SHOWN_REVIEWS_COUNT } from '../../constant';
import { adaptReviewsToClient } from '../../utils/adapter';
import { sortReviews, sliceReviews } from '../../utils/common';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { ApiContext } from '../../context/context';


export default function ReviewsSection({ id }) {
  const [reviews, setReviews] = useState([]);

  const api = useContext(ApiContext);

  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(() => {
    let isUnmount = false;
    api.get(`${ServerPath.COMMENTS}/${id}`)
      .then((response) => {
        if (!isUnmount) {
          const adaptedReviews = adaptReviewsToClient(response.data);
          const sortedReviews = sortReviews(adaptedReviews);
          setReviews(sliceReviews(sortedReviews, SHOWN_REVIEWS_COUNT));
        }
      });
    return () => isUnmount = true;
  }, [api, id]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewList reviews={reviews} />
      {authorizationStatus === AuthorizationStatus.AUTH ?
        <Comment id={id} resetReviews={setReviews} /> :
        ''}
    </section>
  );
}

ReviewsSection.propTypes = {
  id: PropTypes.string.isRequired,
};
