import { getPercentageRating, getTextWithCapitalFirstLetter } from '../../utils/common.js';
import { AppPath, ServerPath, ClassName } from '../../constant.js';
import React, { useState, useEffect, useContext } from 'react';
import RoomGood from '../room-good/room-good.jsx';
import PremiumMark from '../premium-mark/premium-mark.jsx';
import NearestHotels from '../nearest-hotels/nearest-hotels.jsx';
import ProStatus from '../pro-status/pro-status.jsx';
import PageHeader from '../page-header/page-header.jsx';
import { Redirect, useParams } from 'react-router-dom';
import HotelsMap from '../hotels-map/hotels-map.jsx';
import ReviewsSection from '../reviews-section/reviews-section.jsx';
import { adaptHotelToClient, adaptHotelsToClient } from '../../utils/adapter';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import BookmarkButton from '../bookmark-button/bookmark-button.jsx';
import RoomGallery from '../room-gallery/room-gallery.jsx';
import { ApiContext } from '../../context/context.js';

const MAX_SHOWN_HOTELS = 3;

function sliceHotels(hotels, maxCount) {
  if (hotels.length > maxCount) {
    return hotels.slice(0, maxCount);
  }

  return hotels;
}

export default function RoomPage() {
  const [hotel, setHotel] = useState(null);
  const [nearestHotels, setNearestHotels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const api = useContext(ApiContext);

  const { id } = useParams();

  useEffect(() => {
    let isUnmount = false;
    setIsLoaded(false);
    api.get(`${ServerPath.HOTELS}/${id}`)
      .then((response) => {
        if (!isUnmount) {
          const adaptedHotel = adaptHotelToClient(response.data);
          setHotel(adaptedHotel);
          setIsLoaded(true);
        }
      })
      .catch(() => {
        if (!isUnmount) {
          setHotel(null);
          setIsLoaded(true);
        }
      });

    return () => isUnmount = true;
  }, [api, id, setHotel, setIsLoaded]);

  useEffect(() => {
    let isUnmount = false;
    api.get(`${ServerPath.HOTELS}/${id}/nearby`)
      .then((response) => {
        if (!isUnmount) {
          const adaptedHotels = adaptHotelsToClient(response.data);
          const slicedHotels = sliceHotels(adaptedHotels, MAX_SHOWN_HOTELS);
          setNearestHotels(slicedHotels);
        }
      })
      .catch(() => {
        if (!isUnmount) {
          setNearestHotels([]);
        }
      });
    return () => isUnmount = true;
  }, [api, id, setNearestHotels]);


  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!hotel) {
    return <Redirect to={AppPath.ERROR} />;
  }

  return (
    <div className="page">
      <PageHeader />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <RoomGallery images={hotel.images} />
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {hotel.isPremium ? <PremiumMark parentClassName={ClassName.PROPERTY} /> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <BookmarkButton parentClassName={ClassName.PROPERTY} id={hotel.id} isFavorite={hotel.isFavorite} />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: getPercentageRating(hotel.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hotel.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getTextWithCapitalFirstLetter(hotel.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {hotel.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {hotel.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{hotel.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">{hotel.title}</h2>
                <ul className="property__inside-list">
                  {hotel.goods.map((good) => <RoomGood key={`id-${good}`} good={good} />)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={hotel.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {hotel.host.name}
                  </span>
                  {hotel.host.isPro ? <ProStatus /> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {hotel.description}
                  </p>
                </div>
              </div>
              <ReviewsSection id={id} />
            </div>
          </div>
          <section className="property__map map">
            {nearestHotels.length ?
              <HotelsMap activeHotel={hotel} hotels={[...nearestHotels, hotel]} /> :
              ''}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearestHotels id={id} nearestHotels={nearestHotels} />
          </section>
        </div>
      </main>
    </div>
  );
}
