
import dotenv from 'dotenv';

dotenv.config(".env");

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


///////////////

// import dotenv from 'dotenv';

// dotenv.config(".env");

// const {
//   PGUSER,
//   PGPASSWORD,
//   DEV_PGDATABASE,
//   PROD_PGDATABASE,
//   TEST_PGDATABASE,
//   PGHOST,
//   PGPORT
// } = process.env;


// export default {
//     development: {
//       username: PGUSER,
//       password: PGPASSWORD,
//       database: DEV_PGDATABASE,
//       host: PGHOST,
//       port: PGPORT,
//       dialect: 'postgres'
//     },
//     test: {
//       username: PGUSER,
//       password: PGPASSWORD,
//       database: TEST_PGDATABASE,
//       host: PGHOST,
//       port: PGPORT,
//       dialect: 'postgres',
//       logging: false
//     },
//     production: {
//       username: PGUSER,
//       password: PGPASSWORD,
//       database: PROD_PGDATABASE,
//       host: PGHOST,
//       port: PGPORT,
//       dialect: 'postgres'
//     },
//     username: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.DEV_PGDATABASE,
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     dialect: 'postgres',
//     logging: false
//   };