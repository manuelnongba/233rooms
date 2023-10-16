import type { ActionArgs } from '@remix-run/node';
import Footer from '~/component/navigation/Footer';
import Header from '~/component/navigation/Header';
import Rooms from '~/component/rooms/Rooms';
import { getUserFromSession } from '~/data/auth.server';
import { autocomplete } from '~/data/google.server';
import { getRooms } from '~/data/rooms.server';

export default function Index() {
  return (
    <>
      <Header />
      <Rooms />
      <Footer />
    </>
  );
}

export const loader = async ({ request }: any) => {
  const url = new URL(await request.url);
  const userId = await getUserFromSession(request);

  if (
    typeof url.searchParams.get('lng') !== 'string' &&
    typeof url.searchParams.get('lat') !== 'string'
  ) {
    return { rooms: [], userId };
  }

  const rooms = await getRooms(
    url.searchParams.get('lng'),
    url.searchParams.get('lat')
  );

  return { rooms, userId };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { debouncedSearchTerm } = Object.fromEntries(formData);

  const predictions = await autocomplete(debouncedSearchTerm);

  return predictions;
};
