/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE rooms (
      id SERIAL PRIMARY KEY,
      image VARCHAR(500) NOT NULL,
      location POINT NOT NULL,
      address VARCHAR(500) NOT NULL
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE rooms;
`);
};
