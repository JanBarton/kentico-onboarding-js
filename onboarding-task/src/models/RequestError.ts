import { TypedRecord } from './TypedRecord';
import { IRequestError } from '../interfaces/IRequestError';
import { ThunkAction } from '../interfaces/IAction';

const defaultRequestError: IRequestError = {
  targetItemId: undefined,
  errorMessage: '',
  retryAction: () => Promise.resolve(),
};

export class RequestError extends TypedRecord<IRequestError, RequestError>(defaultRequestError, 'RequestError') implements IRequestError {
  readonly targetItemId?: string;
  readonly errorMessage: string;
  readonly retryAction: ThunkAction;
}

