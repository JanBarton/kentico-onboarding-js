import { OrderedMap } from 'immutable';

import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemData } from '../models/ItemData';
import { IItemDTO } from '../interfaces/IItemDTO';

export const parseApiResponseJson = (json: IItemDTO[]): ItemsDataMap => {
  return json.reduce(
    (previousValue: ItemsDataMap, currentValue) =>
      previousValue.set(currentValue.id, new ItemData(currentValue)),
    OrderedMap<string, ItemData>());
};
