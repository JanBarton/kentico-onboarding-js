import { IAction } from '../../@types/IAction';

export const errorFactory = (generateId: () => Guid, actionType: string) => (text: string): IAction => ({
  type: actionType,
  payload: {
    id: generateId(),
    text,
  },
});
