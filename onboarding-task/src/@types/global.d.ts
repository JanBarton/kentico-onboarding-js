import { IAppState } from '../reducers/IAppState';
import { IAction } from './IAction';

type ThunkPromise = (dispatch: Dispatch, getState: () => IAppState) => Promise<IAction>;
type BasicDispatch = (action: IAction) => IAction;
type ThunkDispatch = (thunkAction: ThunkPromise) => Promise<IAction>;

declare global {
  type Dispatch = BasicDispatch & ThunkDispatch;
  type Guid = string;
}
