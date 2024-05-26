import { Rooms } from './rooms.types';

export interface HeaderProps {
  location: { latitude: number; longitude: number };
  getCurrentLocation: () => void;
  getRooms: (rooms: Rooms | object) => void;
  rooms: Rooms;
}

export interface fetcherGet {
  rooms: Rooms[];
  userid: string;
}

export interface fetcherPost {
  predictions?: any;
  status?: string;
}
