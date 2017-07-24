import { ADD_NODE } from './actionTypes';

export const addNodeFactory = generateId => text => ({
  type: ADD_NODE,
  payload: {
    id: generateId(),
    text,
  },
});
