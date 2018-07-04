import { AnyAction } from 'redux';
import { ToggleDirection } from '../constants/actionTypes';

export function orderBy(state: 'asc' | 'dsc' = 'asc' , action: AnyAction): 'asc' | 'dsc' {
   switch (action.type) {
    case ToggleDirection:
       return state === 'dsc' ? 'asc' : 'dsc';
    default:
      return state;
    }
}
