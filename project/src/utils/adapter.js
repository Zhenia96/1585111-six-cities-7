export function adaptHotelToClient(hotel) {
  return {
    bedrooms: hotel.badrooms,
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

export function adaptCommentToClient(comment) {
  return {
    comment: comment.comment,
    date: comment.date,
    id: comment.id,
    rating: comment.rating,
    user: {
      avatarUrl: comment.user.avatar_url,
      id: comment.user.id,
      isPro: comment.user.is_pro,
      name: comment.user.name,
    },
  };
}

export function adaptCommentsToClient(comments) {
  const adaptedComments = [];
  comments.forEach((comment) => {
    adaptedComments.push(adaptCommentToClient(comment));
  });
  return adaptedComments;
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
