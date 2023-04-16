const pg = require('pg');

export const pool = new pg.Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: '',
});
