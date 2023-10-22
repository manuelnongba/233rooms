import type { Rooms } from '~/actions';
import { ActionTypes } from '~/actions/types';
import type { Action } from '~/actions/types';

// const defaultRoomValue = { id: 0, title: '', image: '', distance: 0 };

export default (state: Rooms, action: Action) => {
  switch (action.type) {
    case ActionTypes.ROOMS:
      return action.payload;
    default:
      return state || { rooms: [], message: '' };
  }
};
