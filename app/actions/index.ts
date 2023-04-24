import type { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Location {
  longitude: number | null;
  latitude: number | null;
}

export interface LocationAction {
  type: ActionTypes.LOCATION;
  payload: Location;
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
