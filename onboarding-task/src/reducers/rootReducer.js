import { combineReducers } from 'redux';

import { nodesListReducer } from './listReducers/nodesListReducer';

export const rootReducer = combineReducers({
  nodesList: nodesListReducer,
});

