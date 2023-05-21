import { ActionTypes } from '~/actions/types';
import type { Action } from '~/actions/types';

export default (state: any[], action: Action) => {
  switch (action.type) {
    case ActionTypes.ROOMS:
      return action.payload;
    default:
      return [];
  }
};
