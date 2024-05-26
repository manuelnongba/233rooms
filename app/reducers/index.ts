import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import type { Location } from '~/actions';
import roomsReducer from './roomsReducer';
import { Rooms } from '~/types/rooms.types';

export interface StoreState {
  location: Location;
  rooms: Rooms;
}

export default combineReducers<StoreState>({
  location: locationReducer,
  rooms: roomsReducer,
});
