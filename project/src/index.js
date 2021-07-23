import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer.js';
import createApi from './services/api';
import { getHotels, checkAuthorizationStatus } from './store/api-action';
import { logout, setErrorMessage } from './store/action';
import { configureStore } from '@reduxjs/toolkit';
import Error from './components/error/error';

const api = createApi(() => store.dispatch(logout()), (message) => store.dispatch(setErrorMessage(message)));

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
      <Error />
      <App api={api} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
