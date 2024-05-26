import { ActionTypes } from '~/actions/types';
import type { Action } from '~/actions/types';
import { Rooms } from '~/types/rooms.types';

interface RoomsType {
  rooms: Rooms[];
  message: string;
}

export default (state: RoomsType, action: Action) => {
  switch (action.type) {
    case ActionTypes.ROOMS:
      return action.payload;
    default:
      return state || { rooms: [], message: '' };
  }
};
