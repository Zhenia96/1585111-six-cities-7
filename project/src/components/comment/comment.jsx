import React, { useState } from 'react';
import { ServerPath, SHOWN_REVIEWS_COUNT } from '../../constant';
import { adaptReviewsToClient } from '../../utils/adapter';
import { sortReviews, sliceReviews } from '../../utils/common';
import PropTypes from 'prop-types';

const DEFAULT_RATING = 0;
const DEFAULT_MESSAGE = '';
const MAX_RATING_VALUE = 5;
const MIN_RATING_VALUE = 1;
const MAX_MESSAGE_VALUE = 300;
const MIN_MESSAGE_VALUE = 50;
const StarPosition = {
  FIRST: '1',
  SECOND: '2',
  THIRD: '3',
  FOURTH: '4',
  FIFTH: '5',
};

function isChecked(starPosition, rating) {
  return rating === starPosition;
}

function isCommentValid(rating, message) {
  if (!(rating >= MIN_RATING_VALUE && rating <= MAX_RATING_VALUE)) {
    return false;
  }
  if (!(message.length >= MIN_MESSAGE_VALUE && message.length <= MAX_MESSAGE_VALUE)) {
    return false;
  }
  return true;
}

export default function Comment({ id, api, resetReviews }) {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [isLoaded, setIsLoaded] = useState(true);

  function handleRatingChange({ target }) {
    setRating(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isCommentValid(rating, message)) {
      setIsLoaded(false);
      api.post(`${ServerPath.COMMENTS}/${id}`,
        {
          comment: message,
          rating,
        })
        .then((response) => {
          const adaptedReviews = adaptReviewsToClient(response.data);
          const sortedReviews = sortReviews(adaptedReviews);

          resetReviews(sliceReviews(sortedReviews, SHOWN_REVIEWS_COUNT));
          setRating(DEFAULT_RATING);
          setMessage(DEFAULT_MESSAGE);
          setIsLoaded(true);
        })
        .catch(() => {
          setIsLoaded(true);

        });
    }
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleRatingChange} checked={isChecked(StarPosition.FIFTH, rating)} disabled={!isLoaded} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleRatingChange} checked={isChecked(StarPosition.FOURTH, rating)} disabled={!isLoaded} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleRatingChange} checked={isChecked(StarPosition.THIRD, rating)} disabled={!isLoaded} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleRatingChange} checked={isChecked(StarPosition.SECOND, rating)} disabled={!isLoaded} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleRatingChange} checked={isChecked(StarPosition.FIRST, rating)} disabled={!isLoaded} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={message} onChange={({ target }) => setMessage(target.value)} disabled={!isLoaded}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" onClick={handleSubmit} disabled={!(isLoaded && isCommentValid(rating, message))}>Submit</button>
      </div>
    </form >
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  api: PropTypes.func.isRequired,
  resetReviews: PropTypes.func.isRequired,
};
