import { Record } from 'immutable';

const defaultNodeContent = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

export const NodeContent = Record(defaultNodeContent, 'NodeContent');

