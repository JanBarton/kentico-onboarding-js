import { AnyAction } from 'redux';
import { counter } from './counter';
import { orderBy } from './orderBy';
import { listItems} from './listItems';
import { IStore } from './IStore';

// export const rootReducer = combineReducers<IStore>({
//   counter,
//   orderBy,
// });

export function rootReducer(state: IStore = {} as IStore, action: AnyAction): IStore {
  return {
    counter: counter(state.counter, action),
    orderBy: orderBy(state.orderBy, action),
    listItems: listItems(state.listItems, action),
  };
}
