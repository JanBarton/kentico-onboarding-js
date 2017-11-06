const ImmutablePropTypes = require('react-immutable-proptypes');
const Loading = require('react-loading-animation');
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { List as ImmutableList, OrderedMap } from 'immutable';
import { HotKeys } from 'react-hotkeys';

import { Error } from '../containers/Error';
import { AddNode } from '../containers/AddNode';
import { Node } from '../containers/Node';
import { IKeyMap } from '../@types/IKeyMap';

export interface IListDataProps {
  nodesIds: ImmutableList<Guid>;
  isFetching: boolean;
  errors: OrderedMap<Guid, string>;
}

export interface IListCallbacksProps {
  fetchNodes: () => void;
}

const keyMap: IKeyMap = {
  'cancelNode': 'esc',
  'saveNode': 'enter',
  'deleteNode': 'ctrl+del',
};

type IListProps = IListDataProps & IListCallbacksProps;

export class List extends React.PureComponent<IListProps> {
  static displayName = 'List';
  static propTypes = {
    nodesIds: ImmutablePropTypes.list.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errors: ImmutablePropTypes.map.isRequired,
    fetchNodes: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchNodes();
  }

  render() {
    const {nodesIds, errors, isFetching} = this.props;

    const nodes = nodesIds
      .map((id: Guid, index: number) => (
        <li className="list-group-item" key={id}>
          <Node
            id={id}
            index={index}
          />
        </li>
      ));

    const errorsShown = errors.keySeq()
      .map((id: Guid) => (
        <Error id={id} key={id} />
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <Loading isLoading={isFetching}>
            <ul className="list-group">
              <HotKeys keyMap={keyMap}>
                {nodes}
                <li className="list-group-item">
                  <AddNode />
                </li>
                {errorsShown}
              </HotKeys>
            </ul>
          </Loading>
        </div>
      </div>
    );
  }
}
