import { combineReducers } from 'redux';

import { listReducer } from './list/listReducer';
import { IStore } from '../interfaces/IStore';
import { statusReducer } from './statusReducer';

export const rootReducer = combineReducers<IStore>({
  list: listReducer,
  status: statusReducer,
});
