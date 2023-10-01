/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE roomphotos (
    id UUID PRIMARY KEY,
	  image VARCHAR(200), 
	  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE roomphotos;
`);
};
