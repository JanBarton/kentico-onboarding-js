import { IItem, Uuid } from './IStore';
import * as Immutable from 'immutable';
import { AnyAction } from 'redux';
import { DownItem, UpItem } from '../constants/actionTypes';

export function arrowItems(state: Immutable.Map<Uuid, IItem>, action: AnyAction): Immutable.Map<Uuid, IItem>{
  switch (action.type) {
    case UpItem: {
      return state;
    }
    case DownItem: {
      return state;
    }
    default:
      return state;
  }
}
