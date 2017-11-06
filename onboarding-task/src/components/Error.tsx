import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IAction } from '../@types/IAction';

export interface IErrorDataProps {
  id: Guid;
  errorText: string;
}

export interface IErrorCallbacksProps {
  onClick: () => IAction;
}

type IErrorProps = IErrorDataProps & IErrorCallbacksProps;

const errorPropTypes: React.ValidationMap<IErrorProps> = {
  id: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export const Error: React.StatelessComponent<IErrorProps> = ({errorText, onClick}) =>
  <div className="alert alert-danger">
    <b> {errorText} </b>
    <div onClick={onClick} className="pull-right btn btn-default btn-xs">
      <span className="glyphicon glyphicon-remove" aria-hidden={true} />
    </div>
  </div>;

Error.displayName = 'Error';
Error.propTypes = errorPropTypes;
