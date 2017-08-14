import { combineReducers } from 'redux';

import { ItemsDataMap, itemsReducer } from './itemsReducer';
import { ItemsFlagsMap, itemFlagsMapReducer } from './itemFlagsMapReducer';

interface IListState {
  itemsById: ItemsDataMap;
  itemFlagsMap: ItemsFlagsMap;
}

export const listReducer = combineReducers<IListState>({
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});


