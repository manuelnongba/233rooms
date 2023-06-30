import Rooms from '~/component/Rooms';
import { getRooms } from '~/data/rooms.server';

export default function Index() {
  return (
    <div>
      <Rooms />
    </div>
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

  // return json(
  //   await getRooms(url.searchParams.get('lng'), url.searchParams.get('lat'))
  // );
};

// SELECT id, title, ST_Distance(location::geography, ST_GeographyFromText('POINT(5.618416 -0.076942)')) AS distance
//   FROM rooms
//   WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(5.618416 -0.076942)'), 10000);
