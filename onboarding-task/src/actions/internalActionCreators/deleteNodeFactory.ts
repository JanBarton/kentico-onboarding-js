import { IAction } from '../../@types/global';

interface IDeleteNodeDependencies {
  deleteNodeStart: () => IAction;
  deleteNodeSuccess: (id: Guid) => IAction;
  deleteNodeFailure: (text: string) => IAction;
  deleteNodeFetch: Fetch;
}

export const deleteNodeFactory = (dependencies: IDeleteNodeDependencies) => (id: Guid) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.deleteNodeStart());
    return dependencies.deleteNodeFetch(id)
      .then(() => dispatch(dependencies.deleteNodeSuccess(id)))
      .catch(error => dispatch(dependencies.deleteNodeFailure(error.message)));
  };
};
