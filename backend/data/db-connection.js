const { Pool } = require("pg");

const connectionString = `postgresql://postgres-payday-root:postgres-payday-password@postgres:5432/payday`;

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;