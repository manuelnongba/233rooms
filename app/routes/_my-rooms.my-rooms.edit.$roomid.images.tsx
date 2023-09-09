import type { LoaderArgs } from '@remix-run/node';
import EditImages from '~/component/rooms/EditImages';
import { getRoomImages } from '~/data/rooms.server';

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
