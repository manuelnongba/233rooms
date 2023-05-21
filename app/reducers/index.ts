import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import type { Location } from '~/actions';
import roomsReducer from './roomsReducer';

export interface StoreState {
  location: Location;
  rooms: any;
}

export default combineReducers<StoreState>({
  location: locationReducer,
  rooms: roomsReducer,
});
