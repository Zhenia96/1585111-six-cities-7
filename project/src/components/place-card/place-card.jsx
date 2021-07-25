import { AppPath, CardType, ClassName } from '../../constant.js';
import { getPercentageRating, getTextWithCapitalFirstLetter } from '../../utils/common.js';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PremiumMark from '../premium-mark/premium-mark.jsx';
import BookmarkButton from '../bookmark-button/bookmark-button.jsx';
import { hotelProps } from '../../utils/prop-validation';

function PlaceCard({ hotel, cardType, onCardMouseOver }) {
  const { isFavorite, isPremium, previewImage, price, rating, title, type, id } = hotel;

  function handleCardMouseOver() {
    return (cardType === CardType.CITIES) ? onCardMouseOver(hotel) : false;
  }

  return (
    <article className={`${cardType}__${cardType === CardType.CITIES ? 'place-card' : 'card'} place-card`} onMouseOver={handleCardMouseOver}>
      {isPremium ? <PremiumMark /> : ''}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={'#'}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className={`${cardType}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton parentClassName={ClassName.PLACE_CARD} id={id} isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getPercentageRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppPath.OFFER}/${hotel.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getTextWithCapitalFirstLetter(type)}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  hotel: hotelProps,
  cardType: PropTypes.string.isRequired,
  onCardMouseOver: PropTypes.func,
};

export default memo(PlaceCard);
