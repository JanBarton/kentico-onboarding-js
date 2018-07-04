import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IListItemDataProps {
  readonly text: string;
  readonly index: number;
  readonly itemId: string;
}

interface IListItemCallbackProps {
  readonly onItemClick: (itemId: string) => void;
}

interface IListItemProps extends IListItemDataProps, IListItemCallbackProps {
}

export class ListItem extends React.PureComponent<IListItemProps> {
  static displayName = 'ListItem';
  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };
  onClick = (): void => {
    this.props.onItemClick(this.props.itemId);
  };

  render() {
    return (
      <li onClick={this.onClick} id={this.props.itemId} className="list-group-item">{`${this.props.index + 1}. ${this.props.text}`}</li>
    );
  }
}
