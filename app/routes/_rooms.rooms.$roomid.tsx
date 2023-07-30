import RoomDetails from '~/component/rooms/RoomDetails';
import { getRoomDetails } from '~/data/rooms.server';
import { links as roomDetailsLinks } from '~/component/rooms/RoomDetails';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';

const Room = () => {
  return (
    <div>
      <RoomDetails />
    </div>
  );
};

export default Room;

export const loader = async ({ params }: any) => {
  const id = params.roomid;
  const data = await getRoomDetails(id);

  return data;
};

export const links = () => {
  return [...roomDetailsLinks(), ...headerLinks(), ...menuLinks()];
};
