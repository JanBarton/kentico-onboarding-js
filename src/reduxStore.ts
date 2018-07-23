import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { IStore } from './reducers/IStore';

export const store: IStore = createStore(rootReducer, {}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());



