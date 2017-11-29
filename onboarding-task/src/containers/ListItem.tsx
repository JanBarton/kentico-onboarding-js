import * as React from 'react';
import { connect } from 'react-redux';

import {
  ListItem as ListItemComponent,
  IListItemDataProps,
  IListItemCallbackProps
} from '../components/ListItem';
import * as actionCreators from '../actions/actionCreators';
import { ViewItem } from '../models/ViewItem';
import { IStore } from '../interfaces/IStore';
import { ItemData } from '../models/ItemData';
import { putSavedItem, deleteStoredItem } from '../actions/thunkActionsCreators';
import { IThunkDispatch as Dispatch } from '../interfaces/IThunkDispatch';
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
    dispatch(actionCreators.makeEditable(id)),
  onDelete: () =>
    dispatch(deleteStoredItem(id)),
  onSave: (newText: string) =>
    dispatch(putSavedItem(new ItemData({id, text: newText}))),
  onCancel: () =>
    dispatch(actionCreators.cancelChange(id)),
  onRetry: (retryAction: ThunkAction) =>
    dispatch(retryAction),
});

export const ListItem: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
