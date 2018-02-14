import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createItem } from '../actions';
import { AddItem as AddItemComponent, IAddItemCallbackProps } from '../components/AddItem';
import { IStore } from '../interfaces/IStore';

const mapDispatchToProps = (dispatch: Dispatch<IStore>): IAddItemCallbackProps => ({
  onAddItem: (text: string) => dispatch(createItem(text))
});

export const AddItem: React.ComponentClass = connect(null, mapDispatchToProps)(AddItemComponent);
