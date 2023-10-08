import RoomDetails from '~/component/rooms/RoomDetails';
import { getRoomDetails } from '~/data/rooms.server';
import { links as roomDetailsLinks } from '~/component/rooms/RoomDetails';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';
import { getRoomOwnerInfo } from '~/data/user.server';

const Room = () => {
  return (
    <div>
      <RoomDetails />
    </div>
  );
};

export default Room;

export const loader = async ({ params }: any) => {
  const roomId = params.roomid;
  const roomInfo = await getRoomDetails(roomId);
  const userInfo = await getRoomOwnerInfo(roomId);

  return { roomInfo, userInfo };
};

export const links = () => {
  return [...roomDetailsLinks(), ...headerLinks(), ...menuLinks()];
};
