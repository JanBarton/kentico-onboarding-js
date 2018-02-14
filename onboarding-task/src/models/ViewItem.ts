import * as memoize from 'memoizee';

import { IItemFlags } from './ItemFlags';
import { IItemData } from './ItemData';
import { emptyUuid } from '../utils/constants';
import { NullableRequestError } from '../interfaces/IRequestError';

export interface IViewItem {
  id: string;
  index: number;
  text: string;
  isBeingEdited: boolean;
  isStored: boolean;
  requestError: NullableRequestError;
}

const createViewModel = (index: number, data: IItemData, flags: IItemFlags): IViewItem => (
  {
    id: data.id || emptyUuid,
    index,
    text: data.text,
    isBeingEdited: flags.isBeingEdited,
    isStored: flags.isStored,
    requestError: flags.requestError,
  }
);

const createItemRecordMemoized: (index: number, data: IItemData, flags: IItemFlags) => IViewItem
  = memoize(createViewModel);

export { createItemRecordMemoized as ViewItem };
