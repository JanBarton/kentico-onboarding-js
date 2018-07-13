import { IItem } from '../reducers/IStore';
import * as Immutable from 'immutable';

export interface IStore {
  readonly counter: number;
  readonly orderBy: OrderBy;
  readonly listItems: Immutable.List<IItem>;
  readonly arrowListItems: Immutable.Map<Uuid, IItem>;
}

export type Uuid = string;

export enum OrderBy {
  Ascending = 'asc',
  Descending = 'dsc',
}

export interface IItem {
  isBeingEdited: boolean;
  text: string;
  id: string;
}

