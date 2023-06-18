const { Pool } = require('pg');
require('dotenv').config();

// *~*~*~* auth communicating with database *~*~*~* 

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE
});

module.exports = {
  pool: pool
};
