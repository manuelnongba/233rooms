import type { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Location {
  longitude: number | null;
  latitude: number | null;
}

export interface Rooms {
  // {id: 1, title: 'Accra Room', image: 'accra.png', distance: 13270.3905742
  rooms: object;
}

export interface LocationAction {
  type: ActionTypes.LOCATION;
  payload: Location;
}

export interface RoomsAction {
  type: ActionTypes.ROOMS;
  payload: Rooms;
}

export const getCurrentLocation = () => (dispatch: Dispatch) => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      dispatch<LocationAction>({
        type: ActionTypes.LOCATION,
        payload: { longitude, latitude },
      });
    });
};

export const getRooms = (rooms: Rooms) => (dispatch: Dispatch) => {
  dispatch<RoomsAction>({
    type: ActionTypes.ROOMS,
    payload: rooms,
  });
};
