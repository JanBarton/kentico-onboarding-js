import * as React from 'react';
import { connect } from 'react-redux';

import { Error as ErrorComponent, IErrorCallbacksProps, IErrorDataProps } from '../components/Error';
import { dismissError } from '../actions/publicActionCreators';
import { IAppState } from '../reducers/IAppState';

type IErrorContainerProps = {
  id: Guid
};

const mapStateToProps = ({nodesList: {errors}}: IAppState, {id}: IErrorContainerProps): IErrorDataProps => ({
  id,
  errorText: errors.get(id)
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: IErrorContainerProps): IErrorCallbacksProps => ({
  onClick: () => dispatch(dismissError(id))
});

export const Error: React.ComponentClass<IErrorContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
