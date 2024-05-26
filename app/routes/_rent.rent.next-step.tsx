import { ActionFunctionArgs } from '@remix-run/node';
import ImagesUpload, {
  links as ImagesUploadLinks,
} from '~/component/rooms/ImagesUpload';
import { autocomplete } from '~/data/google.server';
import { createRoom, uploadImages } from '~/data/rooms.server';

const RentNextStep = () => {
  return (
    <>
      <ImagesUpload />
    </>
  );
};
export default RentNextStep;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const roomData = Object.fromEntries(formData);
  let roomID: FormDataEntryValue | number | null = roomData.roomId;

  const { debouncedSearchTerm } = Object.fromEntries(formData);
  const predictions = await autocomplete(debouncedSearchTerm);

  if (roomData.title) {
    roomID = await createRoom(roomData);

    return { roomID };
  }

  if (roomData.price) {
    const userId = await uploadImages(roomData);

    return { userId };
  } else return predictions;
};

export function links() {
  return [...ImagesUploadLinks()];
}
