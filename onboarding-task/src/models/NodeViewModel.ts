import * as memoize from 'memoizee';
import { Record } from 'immutable';

import { NodeContent } from './NodeContent';

export interface INodeViewModel {
  readonly id: Guid;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly isPersisted: boolean;
  readonly index: number;
}

const defaultNodeViewModel: INodeViewModel = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isBeingEdited: false,
  isPersisted: true,
  index: 0,
};

export class NodeViewModel extends Record(defaultNodeViewModel) implements INodeViewModel {
  readonly id: Guid;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly isPersisted: boolean;
  readonly index: number;
}

const createNodeViewModel = (content: NodeContent, isBeingEdited: boolean, isPersisted: boolean, index: number): INodeViewModel => {
  return new NodeViewModel({
    ...content.toObject(),
    isBeingEdited,
    isPersisted,
    index: index + 1,
  });
};

export const createMemoizedNodeViewModel = memoize(createNodeViewModel);
