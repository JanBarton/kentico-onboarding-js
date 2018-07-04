import { IItem} from '../reducers/IStore';
import * as Immutable from 'immutable';

export interface IStore {
  readonly counter: number;
  readonly orderBy: OrderBy;
  readonly listItems: Immutable.List<IItem>;
}

export type OrderBy = 'asc' | 'dsc';

export interface IItem {
  isBeingEdited: boolean;
  text: string;
  id: string;
}
