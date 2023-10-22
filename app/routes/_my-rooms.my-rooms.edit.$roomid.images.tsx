import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import EditImages from '~/component/rooms/EditImages';
import { deleteRoomImage, getRoomImages } from '~/data/rooms.server';
import { links as menuLinks } from '../component/navigation/Menu';
import styles from '../styles/editImages.css';
import { links as headerLinks } from '../component/navigation/Header';
import { getUserFromSession } from '~/data/auth.server';

const EditImagesPage = () => {
  return (
    <div>
      <EditImages />
    </div>
  );
};
export default EditImagesPage;

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const roomid = params.roomid!;
  const userId = await getUserFromSession(request);

  const roomImages = await getRoomImages(roomid);

  return { roomImages, userId };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { imageID } = Object.fromEntries(formData);

  if (request.method === 'DELETE') {
    await deleteRoomImage(String(imageID));
  }
  return imageID;
};

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...headerLinks(),
    ...menuLinks(),
  ];
};
