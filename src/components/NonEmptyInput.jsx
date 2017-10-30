import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

export class NonEmptyInput extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    addInsertedText: PropTypes.func.isRequired,
    checkIsEditing: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditingText: false,
    };
  }

  onInputClick = () => {
    this.setState({
      isEditingText: true,
    });

    if (this.props.checkIsEditing !== undefined) {
      this.props.checkIsEditing(true);
    }
  };

  onExitingInput = () => {
    this.setState({
      isEditingText: false,
    });

    if (this.props.checkIsEditing !== undefined) {
      this.props.checkIsEditing(false);
    }
  };

  onInputChange = (e) => {
    this.props.updateInsertedText(e);
  };

  componentDidMount() {
    const length = this.textInput.value.length;
    this.textInput.focus();
    this.textInput.setSelectionRange(length, length);
  }

  cancelFocusOfInput = () => {
    this.textInput.blur();
  };

  onEnterClick = () => {
    if (this.props.text) {
      this.textInput.blur();
      this.props.addInsertedText();
    }
  };

  render() {
    const handlers = {
      'cancelEditing': () => this.cancelFocusOfInput(),
      'saveChanges': () => this.onEnterClick(),
    };

    const isEditingText = this.state.isEditingText;
    const isNoteValid = this.props.text.length > 0;

    const inputErrorStyle = !isNoteValid && isEditingText
      ? 'has-error'
      : '';

    return (
      <div className={inputErrorStyle}>
        <HotKeys handlers={handlers}>
          <input
            type="text"
            ref={(input) => {
              this.textInput = input;
            }}
            className="form-control"
            onChange={this.onInputChange}
            value={this.props.text}
            onKeyPress={this.onEnterPress}
            onClick={this.onInputClick}
            onBlur={this.onExitingInput}
          />
        </HotKeys>
      </div>
    );
  }
}

