import * as React from 'react';
import { ListItem } from './ListItem';
import { ListItemEditor } from './ListItemEditor';
import { ListItemOrder } from './ListItemOrder';
import { generateId } from '../utils/IDgen';
import * as Immutable from 'immutable';
import { OrderBy } from '../reducers/IStore';

interface IItem {
  isBeingEdited: boolean;
  text: string;
  id: string;
}

interface IListState {
  newItemText: string;
  items: Immutable.List<IItem>;
}

export interface IListDataProps {
  orderBy: OrderBy;
}

export interface IListCallbackProps {
  onToggleOrderClick: () => void;
}

type IListProps = IListDataProps & IListCallbackProps;

export class List extends React.PureComponent<IListProps, IListState> {
  static displayName = 'List';

  constructor(props: IListProps) {
    super(props);

    this.state = {
      newItemText: '',
      items: Immutable.List(),
    };
  }

  onItemClick = (itemId: string): void => {
    const oldItems = this.state.items;
    const indexOfClickedItem = oldItems.findIndex((item: IItem) => item.id === itemId);
    const newItems = oldItems.update(indexOfClickedItem, (oldItem) => {
      return {
        ...oldItem,
        isBeingEdited: true,
      };
    });
    this.setState(() => ({items: newItems}));
  };

  onItemCancel = (itemId: string): void => {
    const oldItems = this.state.items;
    const indexOfClickedItem = oldItems.findIndex((item: IItem) => item.id === itemId);
    const newItems = oldItems.update(indexOfClickedItem, (oldItem) => {
      return {
        ...oldItem,
        isBeingEdited: false,
      };
    });
    this.setState(() => ({items: newItems}));
  };

  onItemDelete = (itemId: string): void => {
    const oldItems = this.state.items;
    const indexOfDeletedItem = oldItems.findIndex((item: IItem) => item.id === itemId);
    const newItems = oldItems.delete(indexOfDeletedItem);
    this.setState(() => ({items: newItems}));
  };

  onToggleSortBy = (): void => {
    this.props.onToggleOrderClick();
  };

  onItemSave = (itemId: string, text: string): void => {
    const oldItems = this.state.items;
    const indexOfSavedItem = oldItems.findIndex((item: IItem) => item.id === itemId);
    const newItem = {
      text,
      isBeingEdited: false,
      id: itemId,
    };
    const newItems = oldItems.update(indexOfSavedItem, () => {
      return newItem;
    });
    this.setState(() => ({items: newItems}));
  };

  getSortedItems = (): Immutable.List<IItem> => {
    const sortedAsc = this.state.items.sort((a, b) => (a.text).localeCompare((b.text))).toList();
    return this.props.orderBy === 'asc' ? sortedAsc : sortedAsc.reverse().toList();
  };


  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    this.setState({
      newItemText: newValue,
    });
  };

  onClickHandler = (): void => {
    const newItem = {
      text: this.state.newItemText,
      isBeingEdited: false,
      id: generateId(),
    };
    const newList = this.state.items.push(newItem);
    this.setState(() => ({items: newList, newItemText: ''}));
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <ListItemOrder orderDirection={this.props.orderBy} onSortByToggle={this.onToggleSortBy} />
          <ul className="list-group">
            {this.getSortedItems().map((item: IItem, index: number) => {
              if (item.isBeingEdited) {
                return (
                  <ListItemEditor
                    key={item.id}
                    text={item.text}
                    itemId={item.id}
                    index={index}
                    onItemCancel={this.onItemCancel}
                    onItemDelete={this.onItemDelete}
                    onItemSave={this.onItemSave}
                  />
                );
              }
              return <ListItem key={item.id} text={item.text} index={index} itemId={item.id} onItemClick={this.onItemClick} />;
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
