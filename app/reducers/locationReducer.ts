/* eslint-disable */
import type { Location } from '~/actions';
import { Action, ActionTypes } from '~/actions/types';

export default (
  state: Location = { longitude: null, latitude: null },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.LOCATION:
      return action.payload;
    default:
      return state;
  }
};
