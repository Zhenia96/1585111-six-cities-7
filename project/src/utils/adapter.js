import { createDate } from './common';

export function adaptHotelToClient(hotel) {
  return {
    bedrooms: hotel.bedrooms,
    city: hotel.city,
    description: hotel.description,
    goods: hotel.goods,
    host: {
      avatarUrl: hotel.host.avatar_url,
      id: hotel.host.id,
      isPro: hotel.host.is_pro,
      name: hotel.host.name,
    },
    id: hotel.id,
    images: hotel.images,
    isFavorite: hotel.is_favorite,
    isPremium: hotel.is_premium,
    location: hotel.location,
    maxAdults: hotel.max_adults,
    previewImage: hotel.preview_image,
    price: hotel.price,
    rating: hotel.rating,
    title: hotel.title,
    type: hotel.type,
  };
}

export function adaptHotelsToClient(hotels) {
  const adaptedHotels = [];
  hotels.forEach((hotel) => {
    adaptedHotels.push(adaptHotelToClient(hotel));
  });
  return adaptedHotels;
}

export function adaptReviewToClient(review) {
  return {
    comment: review.comment,
    date: createDate(review.date),
    id: review.id,
    rating: review.rating,
    user: {
      avatarUrl: review.user.avatar_url,
      id: review.user.id,
      isPro: review.user.is_pro,
      name: review.user.name,
    },
  };
}

export function adaptReviewsToClient(reviews) {
  const adaptedReviews = [];
  reviews.forEach((review) => {
    adaptedReviews.push(adaptReviewToClient(review));
  });
  return adaptedReviews;
}

export function adaptAuthInfoToClient(authInfo) {
  return {
    avatarUrl: authInfo.avatar_url,
    email: authInfo.email,
    id: authInfo.id,
    isPro: authInfo.is_pro,
    name: authInfo.name,
    token: authInfo.token,
  };
}
