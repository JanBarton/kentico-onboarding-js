import React, { PureComponent } from 'react';
import { Adder } from './Adder';
import { Node } from './Node';
import { generateId } from '../utils/generateId';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  _addNode = text => {
    const newNode = {
      id: generateId(),
      text,
    };
    this.setState(state => ({
      nodes: [...state.nodes, newNode],
    }));
  };

  _deleteNode = id => {
    this.setState(state => ({
      nodes: state.nodes.filter(node => node.id !== id),
    }));
  };

  _onUpdateText = (id, text) => {
    this.setState(state => {
      const updateIndex = state.nodes.findIndex(node => node.id === id);
      const updatedList = [...state.nodes];
      updatedList[updateIndex] = {
        ...updatedList[updateIndex],
        text,
      };

      return { nodes: updatedList };
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {this.state.nodes.map((node, index) =>
              <li className="list-group-item" key={node.id}>
                <Node
                  id={node.id}
                  index={index + 1}
                  text={node.text}
                  onSave={this._onUpdateText}
                  onDelete={this._deleteNode}
                />
              </li>)}
            <li className="list-group-item">
              <Adder onAdd={this._addNode} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { List };
