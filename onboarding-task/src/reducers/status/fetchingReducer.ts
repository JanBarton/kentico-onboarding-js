import { IAction } from '../../interfaces/IAction';
import { FETCH_REQUEST_STARTED } from '../../actions/actionTypes';
import { FETCH_REQUEST_SUCCESS } from '../../actions/actionTypes';
import { FETCH_REQUEST_FAIL } from '../../actions/actionTypes';

const defaultState = false;

export const isFetchingReducer = (state: boolean = defaultState, action: IAction): boolean => {
  switch (action.type) {
    case FETCH_REQUEST_STARTED:
      return true;

    case FETCH_REQUEST_SUCCESS:
    case FETCH_REQUEST_FAIL:
      return defaultState;

    default:
      return state;
  }
};
