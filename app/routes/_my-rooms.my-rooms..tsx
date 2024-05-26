import MyRooms from '~/component/rooms/MyRooms';
import { links as myRoomsLinks } from '~/component/rooms/MyRooms';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';
import { getUserFromSession, requireUserSession } from '~/data/auth.server';
import { getUserRooms } from '~/data/rooms.server';
import { getUserName } from '~/data/user.server';
import { Outlet } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';

const MyRoomsPage = () => {
  return (
    <>
      <Outlet />
      <MyRooms />;
    </>
  );
};
export default MyRoomsPage;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserFromSession(request);
  await requireUserSession(request);

  return {
    userRooms: await getUserRooms(userId),
    userName: await getUserName(userId),
    userId,
  };
};

export const links = () => {
  return [...myRoomsLinks(), ...headerLinks(), ...menuLinks()];
};
