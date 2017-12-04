import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';
import { IListItem } from './IListItem';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  isEdited: false,
};

export class ListItem extends Record(emptyItem) implements IListItem {
  id: string;
  text: string;
  isEdited: boolean;

  constructor(params?: Partial<IListItem>) {
    params ? super(params) : super();
  }

  with(values: Partial<IListItem>) {
    return this.merge(values) as this;
  }
}
