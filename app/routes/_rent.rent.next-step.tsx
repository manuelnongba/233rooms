import ImagesUpload from '~/component/rooms/ImagesUpload';
import { links as ImagesUploadLinks } from '~/component/rooms/ImagesUpload';
import { createRoom, uploadImages } from '~/data/rooms.server';

const RentNextStep = () => {
  return (
    <>
      <ImagesUpload />
    </>
  );
};
export default RentNextStep;

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const roomData = Object.fromEntries(formData);
  let roomId: any = roomData.roomId;

  if (roomData.title) {
    roomId = await createRoom(roomData);
  }

  if (roomData.price) await uploadImages(roomData);

  return roomId;
};

export function links() {
  return [...ImagesUploadLinks()];
}
