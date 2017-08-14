import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemsFlagsMap } from '../reducers/list/itemFlagsMapReducer';

export interface IStore {
  list: {
    itemsById: ItemsDataMap;
    itemFlagsMap: ItemsFlagsMap;
  };
}
