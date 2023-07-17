import { pool } from './db.server';

export const createRoom = async ({
  bedrooms,
  bathrooms,
  title,
  lng,
  lat,
}: any) => {
  try {
    const sql = `INSERT INTO rooms(bedrooms, bathrooms, title)
    VALUES (${bedrooms}, ${bathrooms}, '${title}')
    RETURNING id;
   `;

    let roomId: number | null = null;

    const res = await pool.query(sql);
    roomId = +res.rows[0].id;

    return roomId;
  } catch (error) {
    throw error;
  }
};

export const uploadImages = async ({
  price,
  roomId,
  description,
  images,
  lng,
  lat,
}: any) => {
  try {
    const sqlPrice = `UPDATE rooms SET price = ${+price} WHERE id = ${+roomId}`;
    await pool.query(sqlPrice);

    const sqlDesc = `UPDATE rooms SET description = '${description}' WHERE id = ${roomId}`;
    await pool.query(sqlDesc);

    const sqlLocation = `UPDATE rooms SET location = 'POINT(${lng} ${lat})' WHERE id = ${roomId}`;
    await pool.query(sqlLocation);

    const imgArr = images?.split(',');

    if (images)
      imgArr.forEach(async (el: any) => {
        const sql = `INSERT INTO roomphotos(image, room_id) VALUES ('${el}', ${roomId})`;
        console.log(sql);

        await pool.query(sql);
      });
  } catch (error) {
    throw error;
  }
};

export const getRooms = async (lng: any, lat: any) => {
  try {
    const sql = `
    SELECT id, title, ST_Distance(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})')) AS distance, address, price
    FROM rooms
    WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})'), 10000);
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
