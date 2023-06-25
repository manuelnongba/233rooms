import RoomDetails from '~/component/RoomDetails';
import { getRoomDetails } from '~/data/rooms.server';
import { links as roomDetailsLinks } from '~/component/RoomDetails';
import { links as headerLinks } from '~/component/Header';
import { links as menuLinks } from '~/component/Menu';
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

export const loader = ({ params }: any) => {
  const id = params.roomid;
  const data = getRoomDetails(id);

  return data;
};

export const links = () => {
  return [...roomDetailsLinks(), ...headerLinks(), ...menuLinks()];
};
