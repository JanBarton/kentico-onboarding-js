import { AnyAction } from 'redux';
import * as Immutable from 'immutable';
import {ItemDelete} from '../constants/actionTypes';

interface IItem {
  isBeingEdited: boolean;
  text: string;
  id: string;
}

export function listItems(state: Immutable.List<IItem>, action: AnyAction): Immutable.List<IItem> {
  switch (action.type) {
    case ItemDelete:
      return state;
    default:
      return state;
  }
}
