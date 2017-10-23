import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class PlainItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    }),
  };

  render() {
    return (
      <div>
        {this.props.index}. {this.props.item.text}
      </div>
    );
  }
}
