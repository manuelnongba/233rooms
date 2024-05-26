import { ActionFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import RentRoom from '~/component/rooms/Rent';

import { createRoom } from '~/data/rooms.server';

const Rent = () => {
  return (
    <>
      <Outlet />
      <RentRoom />
    </>
  );
};
export default Rent;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const roomData = Object.fromEntries(formData);

  const roomId = await createRoom(roomData);

  return roomId;
};
