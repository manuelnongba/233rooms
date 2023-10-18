import RoomDetails from '~/component/rooms/RoomDetails';
import { getRoomDetails } from '~/data/rooms.server';
import { links as roomDetailsLinks } from '~/component/rooms/RoomDetails';
import Header, { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';
import { getRoomOwnerInfo } from '~/data/user.server';
import { getUserFromSession } from '~/data/auth.server';

const Room = () => {
  return (
    <div>
      <Header />
      <RoomDetails />
    </div>
  );
};

export default Room;

export const loader = async ({ params, request }: any) => {
  const roomId = params?.roomid;
  const userId = await getUserFromSession(request);

  const roomInfo = await getRoomDetails(roomId);
  const userInfo = await getRoomOwnerInfo(roomId);

  return { roomInfo, userInfo, userId };
};

export const links = () => {
  return [...roomDetailsLinks(), ...headerLinks(), ...menuLinks()];
};
