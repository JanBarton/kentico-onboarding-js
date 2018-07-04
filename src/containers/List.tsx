import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../reducers/IStore';
import { Dispatch } from 'redux';
import { IListCallbackProps, IListDataProps, List as ListComponent } from '../components/List';
import { toggleItemsDirection } from '../actions/actions';

function mapStateToProps(state: IStore): IListDataProps {
  return {
    orderBy: state.orderBy,
  };
}

function mapDispatchToProps(dispatch: Dispatch): IListCallbackProps {
  return {
    onToggleOrderClick: () => dispatch(toggleItemsDirection()),
  };
}

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

