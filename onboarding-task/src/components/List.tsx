import { RequestError } from '../models/RequestError';

const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Seq } from 'immutable';

import { AddItem } from '../containers/AddItem';
import { ListItem } from '../containers/ListItem';
import { Error } from './Error';
import { Spinner } from './Spinner';
import { emptyUuid } from '../utils/constants';

import { ThunkAction } from '../interfaces/IAction';

export interface IListDataProps {
  isFetching: boolean;
  requestError: RequestError | null;
  itemIds: Seq.Indexed<string>;
}

export interface IListCallbackProps {
  onResendRequest: (action: ThunkAction) => void;
}

export const List: React.StatelessComponent<IListDataProps & IListCallbackProps> = (props) => {
  const existingItems = props.itemIds.map((id = emptyUuid, index = 0) =>
    <ListItem
      index={index + 1}
      id={id}
      key={id}
    />
  );

  let errorComponent, listComponent;

  listComponent =
    <div className="col-sm-12 col-md-offset-2 col-md-8">
      {
        props.isFetching ?
          <Spinner /> :
          <ol className="list-group">
            {existingItems}
            <AddItem />
          </ol>
      }
    </div>;

  if (props.requestError) {
    errorComponent = <Error
      requestError={props.requestError}
      onResendRequest={props.onResendRequest} />;
  }

  return (
    <div className="row">
      {errorComponent}
      {!props.requestError || props.requestError.targetItemId ? listComponent : ''}
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  itemIds: ImmutablePropTypes.iterableOf(PropTypes.string).isRequired,
};
