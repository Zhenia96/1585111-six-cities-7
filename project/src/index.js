import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createApi from './services/api';
import { apiActionCreator } from './store/api-action';
import { actionCreator } from './store/action';

const api = createApi(() => store.dispatch(actionCreator.logout()));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(apiActionCreator.getHotels());
store.dispatch(apiActionCreator.getAuthorizationStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App api={api} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
