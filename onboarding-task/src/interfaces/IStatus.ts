import { NullableRequestError } from './IRequestError';

export interface IStatus {
  isFetching: boolean;
  requestError: NullableRequestError;
}

