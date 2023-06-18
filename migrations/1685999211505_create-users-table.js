/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    firstname VARCHAR(30)  NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    avatar VARCHAR(200),
    phone VARCHAR(25),
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
	  room_id INTEGER REFERENCES rooms(id)
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE users;
`);
};
