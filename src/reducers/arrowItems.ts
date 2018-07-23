import { IItem, Uuid } from './IStore';
import * as Immutable from 'immutable';
import { AnyAction } from 'redux';
import { DownItem, UpItem } from '../constants/actionTypes';

const initialState: Immutable.Map<Uuid, IItem> = Immutable.Map({
  id1: {isBeingEdited: false, text: 'Nejaky text', id: 'id1'},
  id2: {isBeingEdited: false, text: 'Nejaky sled pismen', id: 'id2'},
});

export function arrowItems(state: Immutable.Map<Uuid, IItem> = initialState, action: AnyAction): Immutable.Map<Uuid, IItem> {
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
