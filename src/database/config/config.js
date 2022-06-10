import dotenv from 'dotenv';
dotenv.config();
const {
  PRODUCTION_DATABASE,
  DEV_DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  TEST_DATABASE_URL,
  TEST_GIT_ACTIONS
} = process.env;

const dialectToggle = () => {
  return TEST_GIT_ACTIONS == "true" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
}

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
    TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    protocol: 'postgres',
    dialectOptions: dialectToggle(),
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
