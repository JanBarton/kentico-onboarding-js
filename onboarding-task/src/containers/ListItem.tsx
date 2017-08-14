import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ListItem as ListItemComponent, IListItemDataProps, IListItemCallbackProps } from '../components/ListItem';
import * as actionCreators from '../actions/actionCreators';
import { ViewItem } from '../models/ViewItem';
import { IStore } from '../interfaces/IStore';

interface IListItemContainerProps {
  id: string;
  index: number;
}

const mapStateToProps = (state: IStore, { id, index }: IListItemContainerProps): IListItemDataProps => ({
  item: ViewItem(
    index,
    state.list.itemsById.get(id),
    state.list.itemFlagsMap.get(id),
  ),
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, { id }: IListItemContainerProps): IListItemCallbackProps => ({
  onClick: () =>
    dispatch(actionCreators.makeEditable(id)),
  onDelete: () =>
    dispatch(actionCreators.deleteItem(id)),
  onSave: (newText: string) =>
    dispatch(actionCreators.saveChange(id, newText)),
  onCancel: () =>
    dispatch(actionCreators.cancelChange(id)),
});

export const ListItem: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
