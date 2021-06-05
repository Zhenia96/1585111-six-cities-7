import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { getHotelsData } from './mock/mock.js';

ReactDOM.render(
  <React.StrictMode>
    <App hotels={getHotelsData(5)} />
  </React.StrictMode>,
  document.getElementById('root'));
