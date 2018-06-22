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
      items: Immutable.List([
        {
          text: 'A',
          isBeingEdited: false,
          id: 0,
        }, {
          text: 'B',
          isBeingEdited: false,
          id: 1,
        }, {
          text: 'C',
          isBeingEdited: false,
          id: 2,
        },
      ]), // { text, isBeingEdited, id (nu,ber( }
      orderDirection: 'asc',
    };
  }

  onItemClick = (itemId) => {
    const oldItems = this.state.items;
    const indexOfClickedItem = oldItems.findIndex((item) => item.id === itemId);
    const newItems = oldItems.update(indexOfClickedItem, (oldItem) => {
      return {
        ...oldItem,
        isBeingEdited: true,
      };
    });
    this.setState({
      items: newItems,
    });
  };

  onItemCancel = (itemId) => {
    const oldItems = this.state.items;
    const indexOfClickedItem = oldItems.findIndex((item) => item.id === itemId);
    const newItems = oldItems.update(indexOfClickedItem, (oldItem) => {
      return {
        ...oldItem,
        isBeingEdited: false,
      };
    });
    this.setState({
      items: newItems,
    });
  };

  onItemDelete = (itemId) => {
    const oldItems = this.state.items;
    const indexOfDeletedItem = oldItems.findIndex((item) => item.id === itemId);
    const newItems = oldItems.delete(indexOfDeletedItem);
    this.setState({
      items: newItems,
    });
  };

  // tady si skoncil, editnutej text se sice ulozi, ale jako id dostane NaN
  onItemSave = (itemId, text) => {
    const oldItems = this.state.items;
    const newItem = {
      text,
      isBeingEdited: false,
    };
    const indexOfSavedItem = oldItems.findIndex((item) => item.id === itemId);
    const newItems = oldItems.update(indexOfSavedItem, () => {
      return newItem;
    });
    this.setState({
      items: newItems,
      id: indexOfSavedItem,
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
            {this.getSortedItems().map((item) => {
              if (item.isBeingEdited) {
                return (
                  <ListItemEditor
                    key={item.id}
                    text={item.text}
                    itemId={item.id}
                    onItemCancel={this.onItemCancel}
                    onItemDelete={this.onItemDelete}
                    onItemSave={this.onItemSave}
                  />
                );
              }
              return <ListItem key={item.id} text={item.text} index={item.id} onItemClick={this.onItemClick} />;
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
