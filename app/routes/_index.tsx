import { useLoaderData } from '@remix-run/react';
import Header from '~/component/Header';
import { links as headerLinks } from '~/component/Header';
import { links as roomsLinks } from '~/component/Rooms';
import Rooms from '~/component/Rooms';
import { pool } from '~/data/db.server';

export default function Index() {
  const rooms: string[] = useLoaderData();

  return (
    <div>
      <Header />
      <Rooms rooms={rooms} />
    </div>
  );
}

export const loader = async () => {
  const { rows } = await pool.query(`
   SELECT id, title, image, ST_Distance(location::geography, ST_GeographyFromText('POINT(-0.076942 5.618416)')) AS distance
   FROM rooms
   WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(-0.076942 5.618416)'), 10000);
  `);

  return rows;
};

export function links() {
  return [...headerLinks(), ...roomsLinks()];
}

// SELECT id, title, ST_Distance(location::geography, ST_GeographyFromText('POINT(5.618416 -0.076942)')) AS distance
//   FROM rooms
//   WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(5.618416 -0.076942)'), 10000);
