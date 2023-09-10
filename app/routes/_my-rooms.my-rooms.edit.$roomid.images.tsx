import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import EditImages from '~/component/rooms/EditImages';
import { deleteRoomImage, getRoomImages } from '~/data/rooms.server';
import styles from '../styles/editImages.css';
import { links as headerLinks } from '../component/navigation/Header';

const EditImagesPage = () => {
  return (
    <div>
      <EditImages />
    </div>
  );
};
export default EditImagesPage;

export const loader = async ({ request, params }: LoaderArgs) => {
  const roomid = +params.roomid!;
  const roomImages = await getRoomImages(roomid);

  return roomImages;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { imageID } = Object.fromEntries(formData);

  if (request.method === 'DELETE') {
    await deleteRoomImage(+imageID);
  }
  return imageID;
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }, ...headerLinks()];
};