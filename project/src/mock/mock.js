function generateId() {
  return 100 * Math.random();
}

function getRandomIntegerRange(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getHotelData() {
  return {
    id: generateId(),
    isFavorite: Boolean(Math.round(Math.random())),
    isPremium: Boolean(Math.round(Math.random())),
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
