import { ADD_NODE } from './actionTypes';
import { IAction } from './IAction';

export const addNodeFactory = (generateId: () => IdType) => (text: string): IAction => ({
  type: ADD_NODE,
  payload: {
    id: generateId(),
    text,
  },
});
