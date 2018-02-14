import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IViewItem } from '../models/ViewItem';
import { Retry } from './Retry';
import { ThunkAction } from '../interfaces/IAction';

export interface IRetryItemDataProps {
  item: IViewItem;
}

export interface IRetryItemCallbackProps {
  onRetry: (action: ThunkAction) => void;
}

export const ItemWithRetry: React.StatelessComponent<IRetryItemDataProps & IRetryItemCallbackProps> = (props) => (
  <div title="An error has occurred">
    <div className="text-left">
      <span className="font-weight-bold">
        {props.item.index}.{' '}
      </span>
      {props.item.text}
      <Retry onResendRequest={() => props.onRetry(props.item.requestError!.retryAction)} />
    </div>
  </div>);

ItemWithRetry.displayName = 'ViewItem';

ItemWithRetry.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onRetry: PropTypes.func.isRequired,
};
