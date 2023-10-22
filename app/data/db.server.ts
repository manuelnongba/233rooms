// const pg = require('pg');

// export const pool = new pg.Pool({
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   database: process.env.DATABASE,
//   user: process.env.DATABASE_USER,
//   password: '',
// });
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
