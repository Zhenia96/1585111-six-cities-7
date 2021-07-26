import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer.js';
import createApi from './services/api';
import { getHotels, checkAuthorizationStatus } from './store/api-action';
import { configureStore } from '@reduxjs/toolkit';
import ErrorMessage from './components/error-message/error-message';
import { ApiContext } from './context/context';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(getHotels());
store.dispatch(checkAuthorizationStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <ApiContext.Provider value={api}>
        <App />
      </ApiContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
