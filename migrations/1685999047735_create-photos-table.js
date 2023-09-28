/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE roomphotos (
    id SERIAL PRIMARY KEY,
	  image VARCHAR(200), 
	  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE NOT NULL 
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE roomphotos;
`);
};
