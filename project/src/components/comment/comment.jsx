import React, { useContext, useState } from 'react';
import { ServerPath, SHOWN_REVIEWS_COUNT } from '../../constant';
import { adaptReviewsToClient } from '../../utils/adapter';
import { sortReviews, sliceReviews } from '../../utils/common';
import PropTypes from 'prop-types';
import { ApiContext } from '../../context/context';

const DEFAULT_MESSAGE = '';

const MessageValue = {
  MAX: 300,
  MIN: 50,
};

const RatingValue = {
  DEFAULT: 0,
  MAX: 5,
  MIN: 1,
};

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
  if (!(rating >= RatingValue.MIN && rating <= RatingValue.MAX)) {
    return false;
  }
  if (!(message.length >= MessageValue.MIN && message.length <= MessageValue.MAX)) {
    return false;
  }
  return true;
}

export default function Comment({ id, resetReviews }) {
  const [rating, setRating] = useState(RatingValue.DEFAULT);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [isLoaded, setIsLoaded] = useState(true);

  const api = useContext(ApiContext);

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
          setRating(RatingValue.DEFAULT);
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
  resetReviews: PropTypes.func.isRequired,
};
