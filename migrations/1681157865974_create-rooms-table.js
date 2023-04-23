/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
	  price INTEGER(10) NOT NULL,
	  description VARCHAR(240),
	  image VARCHAR(200), 
	  address VARCHAR(200) NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE rooms;
`);
};
