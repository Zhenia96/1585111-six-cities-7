import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { getHotelsData, getReviewsData, getUserData } from './mock/mock.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './store/reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const HOTELS_COUNT = 4;
const REVIEWS_COUNT = 5;

const store = createStore(reducer, composeWithDevTools);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App hotels={getHotelsData(HOTELS_COUNT)} reviews={getReviewsData(REVIEWS_COUNT)} user={getUserData()} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
