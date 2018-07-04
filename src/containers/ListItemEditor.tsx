import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IListItemEditorCallbackProps, IListItemEditorDataProps, ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import { onClickItemDelete } from '../actions/actions';
import { IItem, IStore } from '../reducers/IStore';

interface IOwnProps {
  readonly item: IItem;
}

function mapStateToProps(_state: IStore, ownProps: IOwnProps): IListItemEditorDataProps {
  return {
    item: ownProps.item,
  };
}

function mapDispatchToProps(dispatch: Dispatch): IListItemEditorCallbackProps {
  return {
    onItemCancel: () => undefined,
    onItemSave: () => undefined,
    onItemDelete: (itemId: string) => dispatch(onClickItemDelete(itemId)),
  };
}

export const ListItemEditor: React.ComponentClass<IOwnProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemEditorComponent);
