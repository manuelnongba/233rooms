/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE rooms (
    id UUID PRIMARY KEY,
    title VARCHAR(50) NOT NULL DEFAULT 'New Room',
	  price INTEGER NOT NULL DEFAULT 0,
	  description VARCHAR(240),
	  address VARCHAR(200),
    location GEOGRAPHY(POINT, 4326),
    bathrooms INTEGER,
    bedrooms INTEGER
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE rooms;
`);
};
