import RoomDetails from '~/component/RoomDetails';
import { getRoomDetails } from '~/data/rooms.server';
import { links as roomDetailsLinks } from '~/component/RoomDetails';
import { links as headerLinks } from '~/component/Header';
import Header from '~/component/Header';

const Room = () => {
  return (
    <div>
      <Header />
      <RoomDetails />
    </div>
  );
};

export default Room;

export const loader = () => {
  const details = getRoomDetails();

  return details;
};

export const links = () => {
  return [...roomDetailsLinks(), ...headerLinks()];
};
