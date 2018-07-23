import * as React from 'react';
import { ListItem } from './ListItem';
import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemOrder } from './ListItemOrder';
import * as Immutable from 'immutable';
import { OrderBy, IItem } from '../reducers/IStore';

export interface IListState {
  readonly newItemText: string;
}

export interface IListDataProps {
  readonly items: Immutable.List<IItem>;
  readonly orderBy: OrderBy;

}

export interface IListCallbackProps {
  readonly onToggleOrderClick: () => void;
  readonly onItemClick: (itemId: string) => void;
  readonly onAddNewItem: (text: string) => void;
}

type IListProps = IListDataProps & IListCallbackProps;

export class List extends React.PureComponent<IListProps, IListState> {
  static displayName = 'List';

  constructor(props: IListProps) {
    super(props);
    this.state = {
      newItemText: '',
    };
  }

  onToggleSortBy = (): void => {
    this.props.onToggleOrderClick();
  };
  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    this.setState({
      newItemText: newValue,
    });
  };

  onAddNewItem = (): void => {
    this.props.onAddNewItem(this.state.newItemText);
    this.setState(() => ({newItemText: ''}));
  };

  render() {
    return (
      <>
        <div className="row todo-list">
          <div className="col-sm-12 col-md-8">
            <ListItemOrder orderDirection={this.props.orderBy} onSortByToggle={this.onToggleSortBy} />
            <ul className="list-group">
              {this.props.items.map((item: IItem, index: number) => {
                if (item.isBeingEdited) {
                  return (
                    <ListItemEditor
                      key={item.id}
                      item={item}
                    />
                  );
                }
                return <ListItem key={item.id} text={item.text} index={index} itemId={item.id} onItemClick={this.props.onItemClick} />;
              })}
            </ul>
            <div className="list-group">
              <input value={this.state.newItemText} onChange={this.onChangeHandler} type="text" />
              <button onClick={this.onAddNewItem} className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
