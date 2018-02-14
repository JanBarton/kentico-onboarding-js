import * as React from 'react';
import { connect } from 'react-redux';
import * as memoize from 'memoizee';

import { IListCallbackProps, List as ListComponent } from '../components/List';
import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { IStore } from '../interfaces/IStore';
import { ThunkAction } from '../interfaces/IAction';
import { Dispatch } from 'redux';

const getIdsMemoized = memoize((items: ItemsDataMap) => items.keySeq());

const mapStateToProps = (state: IStore) => ({
  isFetching: state.status.isFetching,
  requestError: state.status.requestError,
  itemIds: getIdsMemoized(state.list.itemsById),
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>): IListCallbackProps => ({
  onResendRequest: (retryAction: ThunkAction) => dispatch(retryAction)
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
