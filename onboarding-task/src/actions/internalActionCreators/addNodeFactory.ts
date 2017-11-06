import { IAction } from '../../@types/IAction';
import { INodeContent } from '../../models/NodeContent';
import { IServerNode } from '../../utils/parseFetchedNodes';

interface IAddNodeDependencies {
  addNodeFetch: (text: string) => Promise<IServerNode>;
  addNodeStart: () => IAction;
  addNodeOptimistically: (node: INodeContent) => IAction;
  addNodeSuccess: (temporaryId: Guid, node: INodeContent) => IAction;
  addNodeFailure: (text: string) => IAction;
  parseFetchedNode: (node: IServerNode) => INodeContent;
  idGenerator: () => Guid;
}

export const addNodeFactory = (dependencies: IAddNodeDependencies) => (text: string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.addNodeStart());
    const temporaryId = dependencies.idGenerator();
    dispatch(dependencies.addNodeOptimistically({id: temporaryId, text}));
    return dependencies.addNodeFetch(text)
      .then(json => dependencies.parseFetchedNode(json))
      .then(node => dispatch(dependencies.addNodeSuccess(temporaryId, node)))
      .catch(() => dispatch(dependencies.addNodeFailure('Could not add the selected node.')));
  };
};
