import { Dispatch } from 'redux';

import { ItemData } from '../../models/ItemData';
import { updateItemFailed, updateItemStarted, updateItemSucceeded } from '../actionCreators';
import { controllerUrl } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { IItemDTO } from '../../interfaces/IItemDTO';

type UpdateItemThunkActionFactory = (dependencies: IFactoryDependencies) => (item: ItemData) => ThunkAction;

interface IFactoryDependencies {
  fetchJsonResponse: (url: string, method: string, object?: any) => Promise<IItemDTO>;
  putThunkActionFactory: UpdateItemThunkActionFactory;
}

export const updateItemThunkFactory: UpdateItemThunkActionFactory = (dependencies) =>
  (item: ItemData) => async (dispatch: Dispatch<IStore>) => {
    const url = `${controllerUrl}/${item.id}`;

    dispatch(updateItemStarted(item));

    try {
      const responseItem = await dependencies
        .fetchJsonResponse(url, 'PUT', {id: item.id, text: item.text});

      return dispatch(updateItemSucceeded(responseItem));

    } catch (error) {
      const retryAction = dependencies.putThunkActionFactory(dependencies)(item);
      const failedAction = updateItemFailed(item.id, error.message, retryAction);

      return dispatch(failedAction);
    }
  };
