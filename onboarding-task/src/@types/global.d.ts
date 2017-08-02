import { IAction } from '../actions/IAction';

declare global {
  type Dispatch = {
    (action: IAction): IAction;
  };

  type IdType = string;
}

export {};
