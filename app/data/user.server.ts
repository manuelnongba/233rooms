import { pool } from './db.server';

export const getUserInfo = async (userId: string) => {
  const sql = ` SELECT *
                FROM users u
                WHERE u.id = '${userId}'
                `;

  const { rows } = await pool.query(sql);

  return rows;
};

export const getRoomOwnerInfo = async (roomId: string) => {
  const sql = ` SELECT *
                FROM users u
                LEFT JOIN rooms r ON r.user_id = u.id
                WHERE r.id = '${roomId}'
                `;

  const { rows } = await pool.query(sql);

  return rows;
};

export const getUserName = async (userId: Number) => {
  const sql = `SELECT firstname
                FROM users
                WHERE id = '${userId}';`;

  const { rows } = await pool.query(sql);

  return rows;
};

export const updateUserInfo = async (
  { email, firstname, lastname, phone, address }: any,
  userId: string
) => {
  try {
    const sql = `
    UPDATE users
    SET email = $1, firstname = $2, lastname = $3, phone = $4
    WHERE id = $5;
  `;

    const { rowCount } = await pool.query(sql, [
      email,
      firstname,
      lastname,
      phone,
      userId,
    ]);

    if (!rowCount) throw new Error('Update unsuccessful');

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  const sql = `DELETE FROM users WHERE id = '${userId}'`;

  const { rowCount } = await pool.query(sql);

  return rowCount;
};
