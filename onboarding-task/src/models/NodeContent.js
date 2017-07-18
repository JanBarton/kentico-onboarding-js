import { Record } from 'immutable';

const defaultNodeContent = {
  id: '00000000000000000000000000000000',
  text: '',
};

export const NodeContent = Record(defaultNodeContent, 'NodeContent');

