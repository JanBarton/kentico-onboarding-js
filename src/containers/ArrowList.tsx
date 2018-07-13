import * as React from 'react';
import { IStore } from '../reducers/IStore';
import { IArrowListDataProps, ArrowList as ArrowListComponent } from '../components/ArrowList';
import { connect } from 'react-redux';


function mapStateToProps(state: IStore): IArrowListDataProps {
 return {
   arrowItems: state.arrowListItems,
 };
}

// function mapDispatchToProps(dispatch: Dispatch): IArrowListCallbackProps {
//  return {

//  }
// }

export const List: React.ComponentClass = connect(mapStateToProps, undefined)(ArrowListComponent);

