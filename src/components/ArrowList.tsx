import * as React from 'react';
import { IItem } from '../reducers/IStore';
import * as Immutable from 'immutable';
// import { ArrowListItem} from './ArrowListItem';

export interface IArrowListDataProps {
  readonly arrowItems: Immutable.Map<string, IItem>;
}

export interface IArrowListCallbackProps {
}

type IArrowListProps = IArrowListDataProps & IArrowListCallbackProps;

export class ArrowList extends React.PureComponent<IArrowListProps> {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <ul className="list-group">
              <p>todo</p>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
