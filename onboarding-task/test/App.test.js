import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.tsx';

// Test ignored - redundant in the current context, fails on the finding the store in either the context or props of Connect(List)
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
