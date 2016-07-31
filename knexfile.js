const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/.env` });

const config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};

config.test = config.development;

module.exports = config;
