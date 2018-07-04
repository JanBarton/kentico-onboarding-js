import { AnyAction } from 'redux';
import { ToggleDirection } from '../constants/actionTypes';

export function toggleItemsDirection(): AnyAction {
  return {
    type: ToggleDirection
  };
}
