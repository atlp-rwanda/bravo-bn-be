
import 'dotenv/config';

export default {
  development: {
    username:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    database: process.env.DEV_DATABASE,
    dialect: 'postgres',
  },
  test: {
      username:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      host:process.env.DATABASE_HOST,
      port:process.env.DATABASE_PORT,
      database: process.env.TEST_DATABASE,
    dialect: 'postgres',
  },
  production: {
    username:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    database: process.env.PRODUCTION_DATABASE,
  dialect: 'postgres',
  },
}

