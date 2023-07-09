import { pool } from './db.server';

export const createRoom = async ({
  bedrooms,
  bathrooms,
  title,
  location,
}: any) => {
  const sql = `INSERT INTO rooms(bedrooms, bathrooms, title, location)
               VALUES (${bedrooms}, ${bathrooms}, '${title}', '${location}')
               RETURNING id;
              `;

  let roomId: number | null = null;

  if (bedrooms) {
    const res = await pool.query(sql);
    roomId = +res.rows[0].id;
  }

  return roomId;
};

export const uploadImages = async ({
  price,
  roomId,
  description,
  images,
}: any) => {
  if (price) {
    const sqlPrice = `UPDATE rooms SET price = ${+price} WHERE id = ${+roomId}`;

    await pool.query(sqlPrice);
  }

  if (description) {
    const sqlDesc = `UPDATE rooms SET description = '${description}' WHERE id = ${roomId}`;
    console.log(sqlDesc);

    await pool.query(sqlDesc);
  }

  const imgArr = images?.split(',');
  console.log(imgArr);

  if (images)
    imgArr.forEach(async (el: any) => {
      const sql = `INSERT INTO roomphotos(image, room_id) VALUES ('${el}', ${roomId})`;
      console.log(sql);

      await pool.query(sql);
    });
};

export const getRooms = async (lng: any, lat: any) => {
  try {
    const sql = `
    SELECT id, title, ST_Distance(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})')) AS distance, address, price
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
