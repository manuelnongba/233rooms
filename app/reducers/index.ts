import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import type { Location } from '~/actions';

export interface StoreState {
  location: Location;
}

export default combineReducers<StoreState>({
  location: locationReducer,
});
