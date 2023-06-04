import Footer from '~/component/Footer';
import Header from '~/component/Header';
import { links as headerLinks } from '~/component/Header';
import { links as roomsLinks } from '~/component/Rooms';
import { links as footerLinks } from '~/component/Footer';
import { links as sliderLinks } from '~/component/Slider';
import Rooms from '~/component/Rooms';
import { getRooms } from '~/data/rooms.server';

export default function Index() {
  return (
    <div>
      <Header />
      <Rooms />
      <Footer />
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

export function links() {
  return [
    ...headerLinks(),
    ...roomsLinks(),
    ...footerLinks(),
    ...sliderLinks(),
  ];
}

// SELECT id, title, ST_Distance(location::geography, ST_GeographyFromText('POINT(5.618416 -0.076942)')) AS distance
//   FROM rooms
//   WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(5.618416 -0.076942)'), 10000);
