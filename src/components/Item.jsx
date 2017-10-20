import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlainText } from './PlainText';
import { EditedText } from './EditedText';

export class Item extends PureComponent {
  static propTypes = {
    actionDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.item.text,
      textBackup: props.item.text,
      isEdited: false,
    };
  }

  onDelete = () => {
    this.props.actionDelete(this.props.item.id);
  };

  onSaveItem = (savedText) => {
    this.setState({
      text: savedText,
      textBackup: savedText,
      isEdited: false,
    });
  };

  onCancel = () => {
    this.setState({
      text: this.state.textBackup,
      isEdited: false,
    });
  };

  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  onClick = () => {
    this.setState({
      isEdited: true,
    });
  };

  render() {
    return (
      <li className="list-group-item">
        {(this.state.isEdited) ?
          <EditedText
            text={this.state.text}
            onSaveItem={this.onSaveItem}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
            onChange={this.onChange}
          /> :
          <div onClick={this.onClick}>
            <PlainText
              index={this.props.index + 1}
              text={this.state.text}
            />
          </div>}
      </li>
    );
  }
}
