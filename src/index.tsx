import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import logger from 'redux-logger';
import { getInitialState } from './utils/getInitialState';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import { app } from './reducers/app';
import { App } from './App';

interface IDevTools {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <R>(a: R) => R;
};

const composeEnhancers = (window as IDevTools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(app, getInitialState(), composeEnhancers(
  applyMiddleware(logger),
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'),
);
