import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../interfaces/IAction';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  CREATE_REQUEST_FAIL,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_STARTED,
  UPDATE_REQUEST_SUCCESS,
} from '../../actions/actionTypes';
import { RequestError } from '../../models/RequestError';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state: ItemFlags = defaultState, action: IAction): ItemFlags => {
  switch (action.type) {
    case ITEM_MAKE_EDITABLE:
      return state.typedMerge({isBeingEdited: true});

    case ITEM_CHANGE_CANCELLED:
      return state.typedMerge({isBeingEdited: false});

    case DELETE_REQUEST_STARTED:
    case UPDATE_REQUEST_STARTED:
      return state.typedMerge({isBeingEdited: false, isStored: false, requestError: null});

    case UPDATE_REQUEST_SUCCESS:
      return state.typedMerge({isStored: true, isBeingEdited: false});

    case UPDATE_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL: {
      return state.typedMerge({
        isStored: true,
        requestError: new RequestError({
          targetItemId: action.payload.id,
          retryAction: action.payload.retryAction,
          errorMessage: action.payload.errorMessage,
        })});
    }

    case CREATE_REQUEST_FAIL: {
      return state.typedMerge({
        isStored: false,
        requestError: new RequestError({
          targetItemId: action.payload.id,
          retryAction: action.payload.retryAction,
          errorMessage: action.payload.errorMessage,
        })});
    }

    default:
      return state;
  }
};
