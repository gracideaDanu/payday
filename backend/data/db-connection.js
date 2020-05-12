const { Pool } = require("pg");
require("dotenv").config();

var connectionString = process.env.DB_CONN_STRING_PROD;

if (process.env.NODE_ENV === "test") {
  connectionString = process.env.DB_CONN_STRING_TEST;
}

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
