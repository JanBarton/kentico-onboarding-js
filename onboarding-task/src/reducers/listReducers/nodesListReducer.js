import { combineReducers } from 'redux';

import { nodesReducer } from './nodesReducer';
import { nodesInfoReducer } from './nodesInfoReducer';
import { nodesIdsReducer } from './nodesIdsReducer';

export const nodesListReducer = combineReducers({
  nodes: nodesReducer,
  nodesInfo: nodesInfoReducer,
  nodesIds: nodesIdsReducer,
});
