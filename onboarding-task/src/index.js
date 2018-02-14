import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { rootReducer } from './reducers/rootReducer.ts';
import { fetchItems } from './actions/index.ts';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

store.dispatch(fetchItems());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);

