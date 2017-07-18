import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';

import { AddNode } from './AddNode';
import { createMemoizedNodeViewModel } from '../models/NodeViewModel';
import { generateId } from '../utils/generateId';
import { Node } from './Node';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodes: OrderedMap(),
      nodesInfo: OrderedMap(),
    };
  }

  _addNode = text => {
    const newNode = new NodeContent({
      id: generateId(),
      text,
    });
    const newNodeInfo = new NodeInfo({ isBeingEdited: false });
    const newNodes = this.state.nodes.set(newNode.id, newNode);
    const newNodeInfos = this.state.nodesInfo.set(newNode.id, newNodeInfo);

    this.setState(() => ({
      nodes: newNodes,
      nodesInfo: newNodeInfos,
    }));
  };

  _deleteNode = id => {
    const newNodes = this.state.nodes.delete(id);
    const newNodeInfos = this.state.nodesInfo.delete(id);

    this.setState(() => ({
      nodes: newNodes,
      nodesInfo: newNodeInfos,
    }));
  };

  _toggleNode = id => {
    const newNodeInfos = this.state.nodesInfo.updateIn(
      [id, 'isBeingEdited'],
      isBeingEdited => !isBeingEdited
    );

    this.setState(() => ({
      nodesInfo: newNodeInfos,
    }));
  };

  _saveNode = (id, text) => {
    this._toggleNode(id);
    const newNodes = this.state.nodes.setIn([id, 'text'], text);

    this.setState(() => ({
      nodes: newNodes,
    }));
  };

  _createNodeViewModels = () =>
    this.state.nodes.valueSeq().map((node, index) => (
      <li className="list-group-item" key={node.id}>
        <Node
          nodeModel={createMemoizedNodeViewModel(node, this.state.nodesInfo.get(node.id), index)}
          onSave={this._saveNode}
          onToggle={this._toggleNode}
          onDelete={this._deleteNode}
        />
      </li>
    ));

  render() {
    const nodeViewModels = this._createNodeViewModels();

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {nodeViewModels}
            <li className="list-group-item">
              <AddNode onAdd={this._addNode} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { List };
