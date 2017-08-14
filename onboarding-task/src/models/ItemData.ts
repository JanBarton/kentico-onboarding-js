import { TypedRecord } from './TypedRecord';
import { emptyUuid } from '../utils/constants';

export interface IItemData {
  readonly id: string;
  readonly text: string;
}

const defaultItemData: IItemData = {
  id: emptyUuid,
  text: '',
};

export class ItemData extends TypedRecord<IItemData, ItemData>(defaultItemData, 'ItemData') implements IItemData {
  readonly id: string;
  readonly text: string;
}
