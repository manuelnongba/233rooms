import { pool } from './db.server';

export const getRooms = async (lng: any, lat: any) => {
  try {
    const sql = `
    SELECT id, title, image, ST_Distance(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})')) AS distance
    FROM rooms
    WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})'), 100000);
    `;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};
