import * as React from 'react';
import { IItem, Uuid } from '../reducers/IStore';
import * as Immutable from 'immutable';
import { ArrowListItem } from './ArrowListItem';

export interface IArrowListDataProps {
  readonly arrowItems: Immutable.Map<Uuid, IItem>;
}

export interface IArrowListCallbackProps {
}

type IArrowListProps = IArrowListDataProps & IArrowListCallbackProps;

export class ArrowList extends React.PureComponent<IArrowListProps> {
  static displayName = 'ArrowList';

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <ul className="list-group">
            {this.props.arrowItems.map((item: IItem, key: Uuid) => <ArrowListItem key={key} arrowItem={item} />).toList()}
          </ul>
        </div>
      </div>
    );
  }
}
