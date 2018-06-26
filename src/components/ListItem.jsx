import React, { PropTypes } from 'react';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };
  onClick = () => {
    this.props.onItemClick(this.props.itemId);
  };

  render() {
    return (
      <li onClick={this.onClick} id={this.props.itemId} className="list-group-item">{`${this.props.index + 1}. ${this.props.text}`}</li>
    );
  }
}
