import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { getHotelsData, getReviewsData, getUserData } from './mock/mock.js';
const HOTELS_COUNT = 5;
const REVIEWS_COUNT = 5;

ReactDOM.render(
  <React.StrictMode>
    <App hotels={getHotelsData(HOTELS_COUNT)} reviews={getReviewsData(REVIEWS_COUNT)} user={getUserData()} />
  </React.StrictMode>,
  document.getElementById('root'));
