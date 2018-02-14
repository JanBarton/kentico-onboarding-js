import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  ListItem as ListItemComponent,
  IListItemDataProps,
  IListItemCallbackProps
} from '../components/ListItem';
import { ViewItem } from '../models/ViewItem';
import { IStore } from '../interfaces/IStore';
import { ItemData } from '../models/ItemData';
import { updateItem, deleteItem, makeEditable, cancelChange } from '../actions';
import { ThunkAction } from '../interfaces/IAction';

interface IListItemContainerProps {
  id: string;
  index: number;
}

const mapStateToProps = (state: IStore, {id, index}: IListItemContainerProps): IListItemDataProps => ({
  item: ViewItem(
    index,
    state.list.itemsById.get(id),
    state.list.itemFlagsMap.get(id),
  ),
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, {id}: IListItemContainerProps): IListItemCallbackProps => ({
  onClick: () =>
    dispatch(makeEditable(id)),
  onDelete: () =>
    dispatch(deleteItem(id)),
  onSave: (newText: string) =>
    dispatch(updateItem(new ItemData({id, text: newText}))),
  onCancel: () =>
    dispatch(cancelChange(id)),
  onRetry: (retryAction: ThunkAction) =>
    dispatch(retryAction),
});

export const ListItem: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
