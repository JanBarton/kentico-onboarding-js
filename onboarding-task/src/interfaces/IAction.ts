import { ThunkAction } from 'redux-thunk';

import { IStore } from './IStore';

export interface IAction {
  type: string;
  payload?: any;
}

export type ThunkAction = ThunkAction<Promise<IAction>, IStore, {}>;
