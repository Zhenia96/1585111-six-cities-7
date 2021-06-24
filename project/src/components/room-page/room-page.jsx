import { getPercentageRating, getTextWithCapitalFirstLetter } from '../../utils/common.js';
import { CardType, AppPath } from '../../constant.js';
import React from 'react';
import PropTypes from 'prop-types';
import RoomImage from '../room-image/room-image.jsx';
import RoomGood from '../room-good/room-good.jsx';
import PremiumMark from '../premium-mark/premium-mark.jsx';
import PlaceCard from '../place-card/place-card';
import ProStatus from '../pro-status/pro-status.jsx';
import Review from '../review/review.jsx';
import Comment from '../comment/comment.jsx';
import PageHeader from '../page-header/page-header.jsx';
import { Redirect, useParams } from 'react-router-dom';

function getCurrentHotel(hotels, id) {
  return hotels.find((hotel) => hotel.id === Number(id));
}

export default function RoomPage({ hotels, reviews, user }) {
  const { id } = useParams();
  const currentHotel = getCurrentHotel(hotels, id);
  const reviewCount = reviews.length;

  if (!currentHotel) {
    return <Redirect to={AppPath.ERROR} />;
  }

  const { isFavorite, isPremium, price, rating, title, type, goods, bedrooms, images, maxAdults, host } = currentHotel;

  return (
    <div className="page">
      <PageHeader user={user} />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => <RoomImage key={`id-${image}`} image={image} />)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <PremiumMark /> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: getPercentageRating(rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getTextWithCapitalFirstLetter(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">{title}</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => <RoomGood key={`id-${good}`} good={good} />)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro ? <ProStatus /> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewCount}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((review) => <Review key={review.id} review={review} />)}
                </ul>
                <Comment />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCard hotel={hotels[1]} cardType={CardType.NEAR}></PlaceCard>
              <PlaceCard hotel={hotels[2]} cardType={CardType.NEAR}></PlaceCard>
              <PlaceCard hotel={hotels[3]} cardType={CardType.NEAR}></PlaceCard>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

RoomPage.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};
