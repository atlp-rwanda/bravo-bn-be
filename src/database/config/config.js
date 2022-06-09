import dotenv from 'dotenv';
dotenv.config();
const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DEV_DATABASE,
  PRODUCTION_DATABASE,
  TEST_DATABASE,
  DATABASE_HOST,
  DATABASE_PORT
} = process.env;


module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DEV_DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres'
  },
  test: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: TEST_DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    logging: false,
    ssl: false
  },
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: PRODUCTION_DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres'
  },
};

