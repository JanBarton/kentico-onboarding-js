import { ThunkAction } from './IAction';

export interface IRequestError {
  readonly targetItemId?: string;
  readonly errorMessage: string;
  readonly retryAction: ThunkAction;
}

export type NullableRequestError = IRequestError | null;
