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
    VALUES (${bedrooms.trim().replace(/[,'/]/g, '')}, ${bathrooms
      .trim()
      .replace(/[,'/]/g, '')}, '${title.trim().replace(/[,'/]/g, '')}')
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
  address,
  lng,
  lat,
  userId,
}: any) => {
  try {
    const sql = `
    UPDATE rooms
    SET price = $1, description = $2, location = ST_GeomFromText($3), address = $4, user_id = $5
    WHERE id = $6;
  `;

    await pool.query(sql, [
      +price.trim().replace(/[,'/]/g, ''),
      description.trim().replace(/[,'/]/g, ''),
      `POINT(${lng} ${lat})`,
      address.trim().replace(/[,'/]/g, ''),
      userId,
      roomId,
    ]);

    const imgArr = images?.split(',');

    if (images)
      imgArr.forEach(async (el: any) => {
        const sql = `INSERT INTO roomphotos(image, room_id) VALUES ('${el
          .trim()
          .replace(/[,'/]/g, '')}', ${roomId})`;
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
    SELECT r.id, rp.image, title, ST_Distance(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})')) AS distance, address, price
    FROM rooms r
    left join roomphotos rp on rp.room_id = r.id
    WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})'), 10000000);
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
    SELECT r.bedrooms, r.bathrooms, r.title, r.price, r.description, r.address, rp.image, r.address FROM roomphotos rp
    LEFT JOIN rooms r ON r.id = rp.room_id 
    WHERE rp.room_id = ${id}`;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getUserRooms = async (userId: Number) => {
  const sql = `SELECT title, price, description, address, 
               bathrooms, bedrooms, STRING_AGG(image, ',') as image, room_id 
               FROM rooms 
               LEFT JOIN roomphotos rp  ON rp.room_id = rooms.id
                WHERE user_id = ${userId}
                GROUP BY rp.room_id, rooms.title, rooms.price, rooms.description, rooms.address,
                rooms.bathrooms, rooms.bedrooms;
               `;

  const { rows } = await pool.query(sql);

  return rows;
};

export const updateRoomInfo = async (
  { bedrooms, bathrooms, title, price, address, description }: any,
  roomid: any
) => {
  try {
    const sql = `
    UPDATE rooms
    SET bedrooms = $1, bathrooms = $2, title = $3, price = $4, address = $5, description = $6
    WHERE id = $7;
  `;

    await pool.query(sql, [
      bedrooms,
      bathrooms,
      title,
      price,
      address,
      description,
      roomid,
    ]);
  } catch (error) {
    throw error;
  }
};

export const getRoomImages = async (roomid: number) => {
  try {
    const sql = `SELECT * FROM roomphotos
                 WHERE room_id = ${roomid}`;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {}
};

export const deleteRoom = async (roomid: number) => {
  try {
    const sql = `
    DELETE FROM rooms WHERE id = $1;
  `;

    await pool.query(sql, [roomid]);
  } catch (error) {
    throw error;
  }
};
