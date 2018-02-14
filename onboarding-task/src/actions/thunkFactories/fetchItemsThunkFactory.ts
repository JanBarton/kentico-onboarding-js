import { Dispatch } from 'redux';

import {
  fetchItemsFailed,
  fetchItemsSucceeded,
  fetchItemsStarted,
} from '../actionCreators';
import { controllerUrl } from '../../utils/constants';
import { IStore } from '../../interfaces/IStore';
import { IItemDTO } from '../../interfaces/IItemDTO';
import { ThunkAction } from '../../interfaces/IAction';

type FetchItemsThunkActionFactory = (dependencies: IFactoryDependencies) => () => ThunkAction;

interface IFactoryDependencies {
  fetchJsonResponse: (url: string, method: string, object?: any) => Promise<IItemDTO[]>;
  getThunkActionFactory: FetchItemsThunkActionFactory;
}

export const fetchItemsThunkFactory: FetchItemsThunkActionFactory = (dependencies) =>
  () => async (dispatch: Dispatch<IStore>) => {
    dispatch(fetchItemsStarted());

    try {
      const items = await dependencies.fetchJsonResponse(controllerUrl, 'GET');
      return dispatch(fetchItemsSucceeded(items));

    } catch (error) {
      const retryAction = dependencies.getThunkActionFactory(dependencies)();
      const failedAction = fetchItemsFailed(error.message, retryAction);

      return dispatch(failedAction);
    }
  };
