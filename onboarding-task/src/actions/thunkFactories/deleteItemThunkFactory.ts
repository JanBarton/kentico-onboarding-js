import { Dispatch } from 'redux';

import {
  deleteItemFailed,
  deleteItemStarted,
  deleteItemSucceeded,
} from '../actionCreators';
import { controllerUrl } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

type DeleteItemThunkActionFactory = (dependencies: IFactoryDependencies) => (id: string) => ThunkAction;

interface IFactoryDependencies {
  fetchJsonResponse: (url: string, method: string, object?: any) => Promise<void>;
  deleteThunkActionFactory: DeleteItemThunkActionFactory;
}

export const deleteItemThunkFactory: DeleteItemThunkActionFactory = (dependencies) =>
  (id: string) => async (dispatch: Dispatch<IStore>) => {
    const url = `${controllerUrl}/${id}`;

    dispatch(deleteItemStarted(id));

    try {
      await dependencies.fetchJsonResponse(url, 'DELETE');
      return dispatch(deleteItemSucceeded(id));

    } catch (error) {
      const retryAction = dependencies.deleteThunkActionFactory(dependencies)(id);
      const failedAction = deleteItemFailed(id, error.message, retryAction);

      return dispatch(failedAction);
    }
  };
