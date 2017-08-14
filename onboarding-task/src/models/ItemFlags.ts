import { TypedRecord } from './TypedRecord';

export interface IItemFlags {
  readonly isBeingEdited: boolean;
}

const defaultItemFlags: IItemFlags = {
  isBeingEdited: false,
};

export class ItemFlags extends TypedRecord<IItemFlags, ItemFlags>(defaultItemFlags, 'ItemFlags') implements IItemFlags {
  readonly isBeingEdited: boolean;
}

