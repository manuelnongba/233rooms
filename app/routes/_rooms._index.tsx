import Footer from '~/component/navigation/Footer';
import Rooms from '~/component/rooms/Rooms';
import { getRooms } from '~/data/rooms.server';

export default function Index() {
  return (
    <>
      <Rooms />
      <Footer />
    </>
  );
}

export const loader = async ({ request }: any) => {
  const url = new URL(await request.url);

  if (
    typeof url.searchParams.get('lng') !== 'string' &&
    typeof url.searchParams.get('lat') !== 'string'
  ) {
    return [];
  }

  const rooms = await getRooms(
    url.searchParams.get('lng'),
    url.searchParams.get('lat')
  );

  return rooms;
};
