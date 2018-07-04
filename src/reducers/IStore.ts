import * as Immutable from 'immutable';

export interface IStore {
  readonly counter: number;
  readonly orderBy: OrderBy;
  readonly listItems: Immutable.List<IItem>;
}

interface IItem {
  isBeingEdited: boolean;
  text: string;
  id: string;
}


export type OrderBy = 'asc' | 'dsc';
