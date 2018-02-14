import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';

import App from '../src/App.jsx';

it('renders without crashing', () => {
  if (typeof window !== 'undefined') {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  }
});
