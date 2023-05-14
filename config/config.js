// const dotenv = require('dotenv');
// dotenv.config();
var config = require('../env.json')['local'];
pg =require('pg')
console.log('Database Host:', config.POSTGRES_HOST);
module.exports = {
  HOST: config.POSTGRES_HOST,
  USER: config.POSTGRES_USER,
  PASSWORD: config.POSTGRES_PASSWORD,
  DB: config.POSTGRES_DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//     HOST: process.env.POSTGRES_HOST,
//     USER: process.env.POSTGRES_USER,
//     PASSWORD: process.env.POSTGRES_PASSWORD,
//     DB: process.env.POSTGRES_DB,
//     dialect: process.env.POSTGRES_DIALECT,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };
