import { Record } from 'immutable';

export interface IItemFlags {
  readonly isBeingEdited: boolean;
}

const defaultItemFlags = {
  isBeingEdited: false,
};

export class ItemFlags extends Record(defaultItemFlags, 'ItemFlags') implements IItemFlags {
  readonly isBeingEdited: boolean;

  constructor(params?: IItemFlags) {
    params ? super(params) : super();
  }

  // Typed merge alias
  typedMerge(itemFlags: IItemFlags): ItemFlags {
    return this.merge(itemFlags) as this;
  }
}

