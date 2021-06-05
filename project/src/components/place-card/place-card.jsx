import React from 'react';
import PropTypes from 'prop-types';
import PremiumMark from '../premium-mark/premium-mark.jsx';

const MAX_RATING = 5;

function getPercentageRating(rating) {
  return `${100 * (rating / MAX_RATING)}%`;
}

function getValidType(type) {
  const validType = type[0].toUpperCase() + type.slice(1);
  return validType;
}

export default function PlaceCard(props) {
  const { isFavorite, isPremium, previewImage, price, rating, title, type } = props.hotel;
  return (
    <article className="cities__place-card place-card">
      {isPremium ? <PremiumMark /> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getPercentageRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{title}</a>
        </h2>
        <p className="place-card__type">{getValidType(type)}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  hotel: PropTypes.shape({
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};
