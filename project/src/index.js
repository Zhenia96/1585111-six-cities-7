import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { getReviewsData, getUserData } from './mock/mock.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createApi from './services/api';
import { apiActionCreator } from './store/api-action';
import { actionCreator } from './store/action';

const REVIEWS_COUNT = 5;

const api = createApi(() => store.dispatch(actionCreator.logout()));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(apiActionCreator.getHotels());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={getReviewsData(REVIEWS_COUNT)} user={getUserData()} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
