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
    bedrooms INTEGER,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
      );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE rooms;
`);
};
