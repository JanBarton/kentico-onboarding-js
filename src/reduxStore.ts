import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { IStore } from './reducers/IStore';

export const store: IStore = createStore(rootReducer, {counter: 0, orderBy: 'asc'}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
