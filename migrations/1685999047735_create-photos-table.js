/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
	  image VARCHAR(200), 
	  room_id VARCHAR(200) NOT NULL,
    user_id VARCHAR(200) NOT NULL
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE photos;
`);
};
