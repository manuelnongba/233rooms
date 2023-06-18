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

export const getRoomDetails = async (id: any) => {
  try {
    const sql = `
    SELECT r.title, r.price, r.description, rp.image, r.address FROM roomphotos rp
    LEFT JOIN rooms r ON r.id = rp.room_id 
    WHERE rp.room_id = ${id}`;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};
