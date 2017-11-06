import { IAction } from '../../@types/IAction';

interface IDeleteNodeDependencies {
  deleteNodeStart: () => IAction;
  deleteNodeSuccess: (id: Guid) => IAction;
  deleteNodeFailure: (text: string) => IAction;
  deleteNodeFetch: (id: Guid) => Promise<IAction>;
}

export const deleteNodeFactory = (dependencies: IDeleteNodeDependencies) => (id: Guid) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.deleteNodeStart());
    return dependencies.deleteNodeFetch(id)
      .then(() => dispatch(dependencies.deleteNodeSuccess(id)))
      .catch(() => dispatch(dependencies.deleteNodeFailure('Could not delete the selected node.')));
  };
};
