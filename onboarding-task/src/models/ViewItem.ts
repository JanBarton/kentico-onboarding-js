import * as memoize from 'memoizee';
import { IItemFlags } from './ItemFlags';
import { IItemData } from './ItemData';

export interface IViewItem {
  id: string;
  index: number;
  text: string;
  isBeingEdited: boolean;
}

const createViewModel = (index: number, data: IItemData, flags: IItemFlags): IViewItem => (
  {
    id: data.id,
    index,
    text: data.text,
    isBeingEdited: flags.isBeingEdited,
  }
);

const createItemRecordMemoized: (index: number, data: IItemData, flags: IItemFlags) => IViewItem
  = memoize(createViewModel);

export { createItemRecordMemoized as ViewItem };
