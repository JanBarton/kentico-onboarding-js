import React, { PropTypes } from 'react';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };
  onClick = () => {
    this.props.onItemClick(this.props.index);
  };

  render() {
    return (
      <li onClick={this.onClick} className="list-group-item">{`${this.props.index + 1}. ${this.props.text}`}</li>
    );
  }
}
