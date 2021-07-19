import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer.js';
import createApi from './services/api';
import { apiActionCreator } from './store/api-action';
import { logout } from './store/action';
import { configureStore } from '@reduxjs/toolkit';

const api = createApi(() => store.dispatch(logout()));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(apiActionCreator.getHotels());
store.dispatch(apiActionCreator.getAuthorizationStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App api={api} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
