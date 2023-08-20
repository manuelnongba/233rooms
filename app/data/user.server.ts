import { pool } from './db.server';

export const getUserInfo = async (userId: number) => {
  const sql = `SELECT *
                FROM users
                WHERE id = ${userId};`;

  const { rows } = await pool.query(sql);

  return rows;
};

export const getUserName = async (userId: Number) => {
  const sql = `SELECT firstname
                FROM users
                WHERE id = ${userId};`;

  const { rows } = await pool.query(sql);

  return rows;
};

export const updateUserInfo = async (
  { email, firstname, lastname, phone, address }: any,
  userId: any
) => {
  try {
    const sql = `
    UPDATE users
    SET email = $1, firstname = $2, lastname = $3, phone = $4
    WHERE id = $5;
  `;

    await pool.query(sql, [email, firstname, lastname, phone, userId]);
  } catch (error) {
    throw error;
  }
};