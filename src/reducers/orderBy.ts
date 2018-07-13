import { AnyAction } from 'redux';
import { ToggleDirection } from '../constants/actionTypes';
import { OrderBy } from './IStore';

export function orderBy(state: OrderBy = OrderBy.Ascending, action: AnyAction): OrderBy {
  switch (action.type) {
    case ToggleDirection:
      return state === OrderBy.Descending ? OrderBy.Ascending : OrderBy.Descending;
    default:
      return state;
  }
}
