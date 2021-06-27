import { createDate } from '../utils/common.js';

const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const images = ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'];
const avatars = ['img/avatar-angelina.jpg', 'img/avatar-max.jpg', 'img/avatar.svg'];
const DESCRIPTION = 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.';
const goods = ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'];
const locations = [{
  latitude: 52.3909553943508,
  longitude: 4.85309666406198,
  zoom: 8,
}, {
  latitude: 52.369553943508,
  longitude: 4.85309666406198,
  zoom: 8,
},
{
  latitude: 52.3909553943508,
  longitude: 4.929309666406198,
  zoom: 8,
},
{
  latitude: 52.3809553943508,
  longitude: 4.939309666406198,
  zoom: 8,
}];

function generateId() {
  return 100 * Math.random();
}

let commentId = 0;

function getRandomIntegerRange(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBool() {
  return Boolean(Math.round(Math.random()));
}

export function getHotelData(hotelNumber) {
  return {
    bedrooms: getRandomIntegerRange(1, 5),
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: cityNames[3],
    },
    description: DESCRIPTION,
    goods,
    host: {
      avatarUrl: avatars[0],
      id: generateId(),
      isPro: getRandomBool(),
      name: 'Angelina',
    },
    id: hotelNumber,
    images,
    isFavorite: getRandomBool(),
    isPremium: getRandomBool(),
    location: locations[hotelNumber],
    maxAdults: getRandomIntegerRange(1, 5),
    previewImage: 'img/apartment-02.jpg',
    price: getRandomIntegerRange(0, 1000),
    rating: 4.5,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  };
}

export function getHotelsData(count) {
  let hotelNumber = 0;
  return Array(count).fill().map(() => {
    const hotel = getHotelData(hotelNumber);
    hotelNumber++;
    return hotel;
  });
}

export function getReviewData() {
  return {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: createDate('2019-05-08T14:13:56.569Z'),
    id: commentId++,
    rating: 4,
    user: {
      avatarUrl: avatars[1],
      id: generateId(),
      isPro: getRandomBool(),
      name: 'Max',
    },
  };
}

export function getReviewsData(count) {
  return Array(count).fill().map(() => getReviewData());
}

export function getUserData() {
  return {
    avatarUrl: avatars[2],
    email: 'Oliver.conner@gmail.com',
    id: 1,
    isPro: false,
    name: 'Oliver.conner',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
  };
}
