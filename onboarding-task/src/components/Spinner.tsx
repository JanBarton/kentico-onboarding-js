const spinner = require('../assets/spinner.gif');

import * as React from 'react';

export const Spinner: React.StatelessComponent = () => (
  <img src={spinner} alt="Spinner" title="Fetching data, please wait." />
);
