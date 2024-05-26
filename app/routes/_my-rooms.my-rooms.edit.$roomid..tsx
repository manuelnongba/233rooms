import EditRoom from '~/component/rooms/EditRoom';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as sharedLinks } from '~/component/rooms/EditRoom';
import { links as menuLinks } from '~/component/navigation/Menu';

import { getUserFromSession } from '~/data/auth.server';
import {
  deleteRoom,
  getRoomDetails,
  updateRoomInfo,
} from '~/data/rooms.server';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

const EditRoomPage = () => {
  return (
    <div>
      <EditRoom />
    </div>
  );
};

export default EditRoomPage;

export const links = () => {
  return [...headerLinks(), ...sharedLinks(), ...menuLinks()];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await getUserFromSession(request);

  const roomid = params.roomid!;

  const roomInfo = await getRoomDetails(roomid);

  return { roomInfo, userId };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  await getUserFromSession(request);

  const roomid = params.roomid!;

  if (request.method === 'POST') {
    const rowCount = await updateRoomInfo(credentials, roomid);

    return rowCount;
  }

  if (request.method === 'DELETE') {
    const command = await deleteRoom(roomid);

    // return redirect('/my-rooms');

    return command;
  }
};
