import * as React from 'react';

export interface IRetryCallbackProps {
  onResendRequest: () => void;
}

export const Retry: React.StatelessComponent<IRetryCallbackProps> = (props) => (
  <button
    className="btn btn-default btn-primary pull-right"
    onClick={props.onResendRequest}
  >
    <span className="glyphicon glyphicon-repeat" />
    <span> Retry</span>
  </button>
);
