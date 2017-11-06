import { IAction } from '../../@types/IAction';
import { INodeContent } from '../../models/NodeContent';

interface IUpdateNodeDependencies {
  updateNodeFetch: (node: INodeContent) => Promise<IAction>;
  updateNodeStart: () => IAction;
  updateNodeSuccess: (node: INodeContent) => IAction;
  updateNodeFailure: (text: string) => IAction;
}

export const updateNodeFactory = (dependencies: IUpdateNodeDependencies) => (updateNode: INodeContent) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.updateNodeStart());
    return dependencies.updateNodeFetch(updateNode)
      .then(() => dispatch(dependencies.updateNodeSuccess(updateNode)))
      .catch(() => dispatch(dependencies.updateNodeFailure('Could not save the selected node.')));
  };
};
