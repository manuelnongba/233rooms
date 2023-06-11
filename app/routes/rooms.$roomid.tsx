import RoomDetail from '~/component/RoomDetail';
import { getRoomDetails } from '~/data/rooms.server';

const Room = () => {
  return <RoomDetail />;
};

export default Room;

export const loader = () => {
  const details = getRoomDetails();

  return details;
};
