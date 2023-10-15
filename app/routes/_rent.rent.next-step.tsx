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
  let roomID: any = roomData.roomId;

  if (roomData.title) {
    roomID = await createRoom(roomData);

    return roomID;
  }

  if (roomData.price) {
    const userId = await uploadImages(roomData);

    return userId;
  }
};

export function links() {
  return [...ImagesUploadLinks()];
}
