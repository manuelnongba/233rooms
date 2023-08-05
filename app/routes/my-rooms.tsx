import MyRooms from '~/component/rooms/MyRooms';
import { links as myRoomsLinks } from '~/component/rooms/MyRooms';
import { links as headerLinks } from '~/component/navigation/Header';
import { getUserFromSession } from '~/data/auth.server';
import { getUserRooms } from '~/data/rooms.server';

const MyRoomsPage = () => {
  return (
    <>
      <MyRooms />;
    </>
  );
};
export default MyRoomsPage;

export const loader = async ({ request }: any) => {
  const userId = await getUserFromSession(request);

  return getUserRooms(userId);
};

export const links = () => {
  return [...myRoomsLinks(), ...headerLinks()];
};