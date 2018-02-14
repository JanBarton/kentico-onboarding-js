import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
import { IStore as IListState} from '../../interfaces/IStore';

export const listReducer = combineReducers<IListState>({
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});
