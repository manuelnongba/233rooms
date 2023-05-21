import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import type { Location, Rooms } from '~/actions';
import roomsReducer from './roomsReducer';

export interface StoreState {
  location: Location;
  rooms: Rooms | any;
}

export default combineReducers<StoreState>({
  location: locationReducer,
  rooms: roomsReducer,
});
