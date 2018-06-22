import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { ListItemEditor } from './ListItemEditor';
import { ListItemOrder } from './ListItemOrder';
import Immutable from 'immutable';

export class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);

    this.state = {
      newItemText: '',
      items: Immutable.List(),
      orderDirection: 'asc',
    };
  }

  onItemClick = (index) => {
    const oldItems = this.state.items;
    const newItems = oldItems.update(index, (oldItem) => {
      return {
        ...oldItem,
        isBeingEdited: true,
      };
    });
    this.setState({
      items: newItems,
    });
  };

  onItemCancel = (index) => {
    const oldItems = this.state.items;
    const newItems = oldItems.update(index, (oldItem) => {
      return {
        ...oldItem,
        isBeingEdited: false,
      };
    });
    this.setState({
      items: newItems,
    });
  };

  onItemDelete = (index) => {
    const oldItems = this.state.items;
    const newItems = oldItems.delete(index);
    this.setState({
      items: newItems,
    });
  };

  onItemSave = (index, text) => {
    const oldItems = this.state.items;
    const newItem = {
      text,
      isBeingEdited: false,
    };
    const newItems = oldItems.update(index, () => {
      return newItem;
    });
    this.setState({
      items: newItems,
    });
  };

  getSortedItems = () => {
    if (this.state.orderDirection === 'asc') {
      return this.state.items.sort(
        (a, b) => (a.text).localeCompare((b.text))
      );
    }

    return this.state.items.sort(
      (a, b) => (b.text).localeCompare((a.text))
    );
  };

  onToggleSortBy = () => {
    const newDirection = this.state.orderDirection === 'asc' ? 'desc' : 'asc';
    this.setState({
      orderDirection: newDirection,
    });
  };

  onChangeHandler = (event) => {
    const newValue = event.target.value;
    this.setState({
      newItemText: newValue,
    });
  };

  onClickHandler = () => {
    const newItem = {
      text: this.state.newItemText,
      isBeingEdited: false,
    };
    const newList = this.state.items.push(newItem);
    this.setState({
      items: newList,
      newItemText: '',
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <ListItemOrder orderDirection={this.state.orderDirection} onSortByToggle={this.onToggleSortBy} />
          <ul className="list-group">
            {this.getSortedItems().map((item, index) => {
              if (item.isBeingEdited) {
                return (
                  <ListItemEditor
                    key={index}
                    text={item.text}
                    index={index}
                    onItemCancel={this.onItemCancel}
                    onItemDelete={this.onItemDelete}
                    onItemSave={this.onItemSave}
                  />
                );
              }
              return <ListItem key={index} text={item.text} index={index} onItemClick={this.onItemClick} />;
            })}
          </ul>
          <div className="list-group">
            <input value={this.state.newItemText} onChange={this.onChangeHandler} type="text" />
            <button onClick={this.onClickHandler} className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    );
  }
}
