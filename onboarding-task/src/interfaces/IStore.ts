import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemsFlagsMap } from '../reducers/list/itemFlagsMapReducer';
import { IStatus } from './IStatus';

export interface IStore {
  list: {
    itemsById: ItemsDataMap;
    itemFlagsMap: ItemsFlagsMap;
  };
  status: IStatus;
}
