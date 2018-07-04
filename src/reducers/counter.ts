import { AnyAction } from 'redux';
import { Decrement, Increment } from '../constants/actionTypes';

export function counter(state: number = 0, action: AnyAction): number {
  switch (action.type) {
    case Increment:
      return state + 1;
    case Decrement:
      return state - 1;
    default:
      return state;
  }
}
