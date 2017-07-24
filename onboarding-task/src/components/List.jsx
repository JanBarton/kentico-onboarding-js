import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { AddNode } from '../containers/AddNode';
import { Node } from '../containers/Node.js';

const List = props => {
  const nodes = props.nodesIds
    .map((id, index) => (
      <li className="list-group-item" key={id}>
        <Node
          id={id}
          index={index}
        />
      </li>
    ));

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8 ">
        <ul className="list-group">
          {nodes}
          <li className="list-group-item">
            <AddNode />
          </li>
        </ul>
      </div>
    </div>
  );
};

List.displayName = 'List';
List.propTypes = {
  nodesIds: ImmutablePropTypes.list.isRequired,
};

export { List };
