import { combineReducers } from 'redux';

import { listReducer } from './list/listReducer';
import { IStore } from '../interfaces/IStore';

export const rootReducer = combineReducers<IStore>({
  list: listReducer,
});
