import RoomDetails from '~/component/rooms/RoomDetails';
import { getRoomDetails } from '~/data/rooms.server';
import { links as roomDetailsLinks } from '~/component/rooms/RoomDetails';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';
import { getUserInfo } from '~/data/user.server';
import { getUserFromSession } from '~/data/auth.server';

const Room = () => {
  return (
    <div>
      <RoomDetails />
    </div>
  );
};

export default Room;

export const loader = async ({ request, params }: any) => {
  const id = params.roomid;
  const userID = await getUserFromSession(request);
  const roomInfo = await getRoomDetails(id);
  const userInfo = await getUserInfo(userID);
  console.log(userInfo);

  return { roomInfo, userInfo };
};

export const links = () => {
  return [...roomDetailsLinks(), ...headerLinks(), ...menuLinks()];
};
