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
    SELECT * FROM rooms;
  `);

  return rows;
};

export function links() {
  return [...headerLinks(), ...roomsLinks()];
}
