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
