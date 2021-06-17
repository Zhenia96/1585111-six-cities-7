import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { getHotelsData, getCommentsData } from './mock/mock.js';
const HOTELS_COUNT = 5;
const COMMENTS_COUNT = 5;

ReactDOM.render(
  <React.StrictMode>
    <App hotels={getHotelsData(HOTELS_COUNT)} comments={getCommentsData(COMMENTS_COUNT)} />
  </React.StrictMode>,
  document.getElementById('root'));
