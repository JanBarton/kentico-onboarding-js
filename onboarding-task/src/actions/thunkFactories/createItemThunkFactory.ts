import { Dispatch } from 'redux';

import { controllerUrl } from '../../utils/constants';
import { createItemFailed, createItemStarted, createItemSucceeded } from '../actionCreators';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { IItemData } from '../../models/ItemData';

type CreateItemThunkActionFactory = (dependencies: IFactoryDependencies) => (newText: string) => ThunkAction;

interface IFactoryDependencies {
  fetchJsonResponse: (url: string, method: string, object?: any) => Promise<IItemData>;
  optimisticUpdatedGenerator: () => string;
  postThunkActionFactory: CreateItemThunkActionFactory;
}

export const createItemThunkFactory: CreateItemThunkActionFactory = (dependencies) =>
  (text: string) => async (dispatch: Dispatch<IStore>) => {

    const optimisticUpdateId = dependencies.optimisticUpdatedGenerator();
    dispatch(createItemStarted(optimisticUpdateId, text));

    try {
      const item = await dependencies.fetchJsonResponse(controllerUrl, 'POST', {text});
      return dispatch(createItemSucceeded(optimisticUpdateId, item));
    } catch (error) {
      const retryAction = dependencies.postThunkActionFactory({
        ...dependencies,
        optimisticUpdatedGenerator: () => optimisticUpdateId,
      })(text);
      const createFailedAction = createItemFailed(optimisticUpdateId, error.message, retryAction);

      return dispatch(createFailedAction);
    }
  };
