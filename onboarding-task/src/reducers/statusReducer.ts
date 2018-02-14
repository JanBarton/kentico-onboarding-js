import { IStatus } from '../interfaces/IStatus';
import { isFetchingReducer } from './status/fetchingReducer';
import { combineReducers } from 'redux';
import { errorReducer } from './status/errorReducer';

export const statusReducer = combineReducers<IStatus>({
  isFetching: isFetchingReducer,
  requestError: errorReducer,
});


