import type { LocationAction, RoomsAction } from '.';

export enum ActionTypes {
  LOCATION,
  ROOMS,
}

export type Action = LocationAction | RoomsAction;
