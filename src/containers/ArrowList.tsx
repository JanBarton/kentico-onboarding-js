import * as React from 'react';
import { IStore } from '../reducers/IStore';
import { IArrowListDataProps, ArrowList as ArrowListComponent } from '../components/ArrowList';
import { connect } from 'react-redux';


function mapStateToProps(state: IStore): IArrowListDataProps {
  // const orderedItems = state.arrowListItemsOrder.map((itemId: Uuid) => state.arrowListItems.get(itemId));
  return {
    arrowItems: state.arrowListItems,
  };
}

// function mapDispatchToProps(dispatch: Dispatch): IArrowListCallbackProps {
//  return {

//  }
// }

export const ArrowList: React.ComponentClass = connect(mapStateToProps)(ArrowListComponent);

