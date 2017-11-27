import {
  connect,
  Dispatch
} from 'react-redux';
import { addNewNote } from '../actions/actionCreators';
import {
  AddNote as AddNoteComponent,
  IAddNoteCallbacksProps,
  IAddNoteDataProps
} from '../components/AddNote';
import { IAction } from '../models/IAction';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): IAddNoteDataProps => ({
  isInputFocused: state.notes.isAddingNote,
  text: state.notes.currentTextToAdd,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IAddNoteCallbacksProps => ({
  onAddClick: (insertedText: string) =>
    dispatch(addNewNote(insertedText)),
});

export const AddNote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteComponent);
