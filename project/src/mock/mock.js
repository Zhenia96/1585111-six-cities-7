const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const images = ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'];
const avatars = ['img/avatar-angelina.jpg', 'img/avatar-max.jpg', 'img/avatar.svg'];
const DESCRIPTION = 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.';
const goods = ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'];

function generateId() {
  return 100 * Math.random();
}

let hotelId = 0;
let commentId = 0;

function getRandomIntegerRange(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCityName() {
  const randomIndex = getRandomIntegerRange(0, (cityNames.length - 1));
  return cityNames[randomIndex];
}

export function getHotelData() {
  return {
    bedrooms: getRandomIntegerRange(1, 5),
    city: {
      name: getRandomCityName(),
    },
    description: DESCRIPTION,
    goods,
    host: {
      avatarUrl: avatars[0],
      id: generateId(),
      isPro: Boolean(Math.round(Math.random())),
      name: 'Angelina',
    },
    id: hotelId++,
    images,
    isFavorite: Boolean(Math.round(Math.random())),
    isPremium: Boolean(Math.round(Math.random())),
    maxAdults: getRandomIntegerRange(1, 5),
    previewImage: 'img/apartment-02.jpg',
    price: getRandomIntegerRange(0, 1000),
    rating: 4.5,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  };
}

export function getHotelsData(count) {
  return Array(count).fill().map(() => getHotelData());
}

export function getCommentData() {
  return {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: commentId++,
    rating: 4,
    user: {
      avatarUrl: avatars[1],
      id: generateId(),
      isPro: Boolean(Math.round(Math.random())),
      name: 'Max',
    },
  };
}

export function getCommentsData(count) {
  return Array(count).fill().map(() => getCommentData());
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
