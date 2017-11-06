import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { App } from './App.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { rootReducer } from './reducers/rootReducer.ts';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
