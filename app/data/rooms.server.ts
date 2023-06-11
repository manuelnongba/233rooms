import { pool } from './db.server';

export const getRooms = async (lng: any, lat: any) => {
  try {
    const sql = `
    SELECT id, title, image, ST_Distance(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})')) AS distance, address, price
    FROM rooms
    WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})'), 100000);
    `;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getRoomDetails = async () => {
  try {
    const sql = `
    SELECT r.title, r.price, r.description, p.image, r.address FROM photos p
    LEFT JOIN rooms r ON r.id = p.room_id 
    WHERE p.room_id = 1`;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};
