import { AnyAction } from 'redux';
import { counter } from './counter';
import { orderBy } from './orderBy';
import { items } from './Items';
import { arrowItems} from './arrowItems';
import { IStore } from './IStore';

export function rootReducer(state: IStore = {} as IStore, action: AnyAction): IStore {
  return {
    counter: counter(state.counter, action),
    orderBy: orderBy(state.orderBy, action),
    listItems: items(state.listItems, action),
    arrowListItems: arrowItems(state.arrowListItems, action),
  };
}
