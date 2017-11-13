import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalText: props.item.text,
      text: props.item.text,
      isBeingEdited: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  handleInputChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSaveButton() {
    const text = this.state.text;

    if (text === '') {
      return;
    }

    this.setState({ isBeingEdited: false, text, originalText: text });
  }

  handleCancelButton() {
    const text = this.state.originalText;
    this.setState({ isBeingEdited: false, text });
  }

  handleItemClick() {
    this.setState({ isBeingEdited: true });
  }

  render() {
    const inEditMode = this.state.isBeingEdited;
    const number = this.props.item.number;
    let listItemContent;
    if (inEditMode) {
      listItemContent = (
        <li className="list-group-item">
          <div className="form-inline">
            <label>{number}{'. '}</label>
            <input className="form-control" type="text" value={this.state.text} onChange={this.handleInputChange} />
            <button className="btn btn-primary" onClick={this.handleSaveButton}>Save</button>
            <button className="btn btn-secondary" onClick={this.handleCancelButton}>Cancel</button>
            <button className="btn btn-danger" onClick={this.props.deleteClick}>Delete</button>
          </div>
        </li>
      );
    }
    else {
      listItemContent = (
        <li className="list-group-item" onClick={this.handleItemClick}>
          {number}. {this.state.text}
        </li>
      );
    }

    return listItemContent;
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteClick: PropTypes.func.isRequired,
};
