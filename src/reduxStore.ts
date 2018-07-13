import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { IStore, OrderBy } from './reducers/IStore';
import * as Immutable from 'immutable';


export const store: IStore = createStore(rootReducer, {
  counter: 0,
  orderBy: OrderBy.Ascending,
  listItems: Immutable.List(),
  arrowListItems: Immutable.Map(),
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());



