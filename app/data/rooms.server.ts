import { pool } from './db.server';

export const createRoom = async ({ bedrooms, bathrooms, title }: any) => {
  try {
    const sql = `INSERT INTO rooms(id, bedrooms, bathrooms, title)
    VALUES (uuid_generate_v4(), ${bedrooms
      .trim()
      .replace(/[,'/]/g, '')}, ${bathrooms
      .trim()
      .replace(/[,'/]/g, '')}, '${title.trim().replace(/[,'/]/g, '')}')
    RETURNING id;
   `;

    let roomId: number | null = null;

    const res = await pool.query(sql);
    roomId = res?.rows[0].id;

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
    WHERE id = $6
    RETURNING user_id
  `;

    const { rows } = await pool.query(sql, [
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
        try {
          const sql = `INSERT INTO roomphotos(id, image, room_id) VALUES (uuid_generate_v4(), '${el.trim()}', '${roomId}')`;

          await pool.query(sql);
        } catch (error) {}
      });

    return rows[0].user_id;
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
    WHERE ST_DWithin(location::geography, ST_GeographyFromText('POINT(${lng} ${lat})'), 100000);
    `;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getRoomDetails = async (id: string) => {
  try {
    const sql = `
    SELECT r.bedrooms, r.bathrooms, r.title, r.price, r.description, r.address, rp.image, r.address FROM rooms r
    LEFT JOIN roomphotos rp ON rp.room_id  = r.id
    WHERE r.id = '${id}'`;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getUserRooms = async (userId: Number) => {
  const sql = `SELECT r.id, title, price, description, address, 
               bathrooms, bedrooms, STRING_AGG(image, ',' ORDER BY rp.id) as image
               FROM rooms r
               LEFT JOIN roomphotos rp  ON rp.room_id = r.id
                WHERE r.user_id = '${userId}'
                GROUP BY r.id, r.title, r.price, r.description, r.address,
                r.bathrooms, r.bedrooms
               `;

  const { rows } = await pool.query(sql);

  return rows;
};

export const updateRoomInfo = async (
  { bedrooms, bathrooms, title, price, address, description, lng, lat }: any,
  roomid: any
) => {
  let sql = '';

  try {
    if (lng) {
      sql = `
      UPDATE rooms
      SET location = ST_GeomFromText('POINT(${lng} ${lat})')
      WHERE id = '${roomid}';
      `;

      const { rowCount } = await pool.query(sql);
      return rowCount;
    }

    if (bedrooms) {
      sql = `
      UPDATE rooms
      SET bedrooms = $1, bathrooms = $2, title = $3, price = $4, address = $5, description = $6
      WHERE id = $7;
    `;

      const { rowCount } = await pool.query(sql, [
        bedrooms,
        bathrooms,
        title,
        price,
        address,
        description,
        roomid,
      ]);

      return rowCount;
    }
  } catch (error) {
    throw error;
  }
};

export const getRoomImages = async (roomid: string) => {
  try {
    const sql = `SELECT * FROM roomphotos
                 WHERE room_id = '${roomid}'`;

    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {}
};

export const deleteRoom = async (roomid: string) => {
  try {
    const sql = `
    DELETE FROM rooms WHERE id = $1;
  `;

    const { rowCount } = await pool.query(sql, [roomid]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const deleteRoomImage = async (imageID: string) => {
  try {
    const sql = `
    DELETE FROM roomphotos WHERE id = $1;
  `;

    await pool.query(sql, [imageID]);
  } catch (error) {
    throw error;
  }
};
