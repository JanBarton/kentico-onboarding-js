import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addNode, IAction } from '../actions/actionCreators';
import { AddNode as AddNodeComponent, IAddNodeCallbacksProps } from '../components/AddNode';

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IAddNodeCallbacksProps => ({
  onAdd: (text: string) => dispatch(addNode(text)),
});

export const AddNode = connect(
  null,
  mapDispatchToProps,
)(AddNodeComponent);
