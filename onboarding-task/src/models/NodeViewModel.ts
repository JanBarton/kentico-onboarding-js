import * as memoize from 'memoizee';
import { Record } from 'immutable';

import { NodeContent } from './NodeContent';
import { NodeInfo } from './NodeInfo';

export interface INodeViewModel {
  readonly id: IdType;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly index: number;
}

const defaultNodeViewModel: INodeViewModel = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isBeingEdited: false,
  index: 0,
};

export class NodeViewModel extends Record(defaultNodeViewModel) implements INodeViewModel {
  readonly id: IdType;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly index: number;
}

const createNodeViewModel = (content: NodeContent, info: NodeInfo, index: number): INodeViewModel => {
  return new NodeViewModel({
    ...content.toObject(),
    ...info.toObject(),
    index: index + 1,
  });
};

export const createMemoizedNodeViewModel = memoize(createNodeViewModel);
